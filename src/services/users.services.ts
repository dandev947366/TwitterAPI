import databaseService from './database.services'
import User from '../models/schemas/User.schema'
import { RegisterReqBody } from '../models/requests/User.requests'
import { hashPassword } from '../utils/crypto'
import { signToken } from '../utils/jwt'
import { TokenType } from '../constants/enum'

class UsersService {
  //ANCHOR - ACCESS TOKEN
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options:{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      
      }
    })
  }

  //ANCHOR - REFRESH TOKEN
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options:{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      
      }
    })
  }

  //ANCHOR - REGISTER SERVICE
  async register(payload: RegisterReqBody) {
    try {
      const { email, password } = payload
      const result = await databaseService.users.insertOne(
        new User({
          ...payload,
          date_of_birth: new Date(payload.date_of_birth),
          password: hashPassword(payload.password)
        })
      )
      const user_id = result.insertedId.toString()
      const [access_token, refresh_token] = await Promise.all([
        this.signAccessToken(user_id),
        this.signRefreshToken(user_id)
      ])
      return {
        access_token,
        refresh_token
      }
    } catch (error) {
      console.error('Error during user registration:', error)
      throw new Error('User registration failed')
    }
  }

  //ANCHOR - CHECK EMAIL EXIST
  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
}
const usersService = new UsersService()
export default usersService
