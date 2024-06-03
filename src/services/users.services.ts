import databaseService from "./database.services"
import User from "../models/schemas/User.schema"
import {RegisterReqBody} from '../models/requests/User.requests'
import { hashPassword } from "../utils/crypto"
import {signToken} from '../utils/jwt'
import {TokenType} from '../constants/enum'
class UsersService {
    private signAccessToken(user_id: string){
        return signToken({
            payload:{
                user_id,
                token_type:TokenType.AccessToken
                }
        })
    
    }
    
    private signRefreshToken(user_id: string){
        return signToken({
            payload:{
                user_id,
                token_type:TokenType.RefreshToken
                }
        })
    
    }
    async register(payload: RegisterReqBody){
        const {email, password}=payload
        const result = await databaseService.users.insertOne(
        
            new User({
            ...payload, 
            date_of_birth: new Date(payload.date_of_birth),
            password: hashPassword(payload.password)
            
            
            })
        )
        return result
    
    }
    async checkEmailExist(email: string){
        const user = await databaseService.users.findOne({email})
        return Boolean(user)
    }


}
const usersService = new UsersService()
export default usersService