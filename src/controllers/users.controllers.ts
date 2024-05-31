import { Request, Response } from 'express'
import databaseService from '../services/database.services'
import User from '../models/schemas/User.schema'

export const loginController = (req: Request, res: Response) => {

    const {email, password} = req.body
    if(email == 'dan@gmail.com' && password=='123456'){
        return res.status(200).json({
            message: "Login success"
        })
    }
    return res.status(400).json({
        error: "Login failed"
    })

}

export const registerController = async (req: Request, res: Response) => {

    const {email, password} = req.body
    try {
        const result = await databaseService.users.insertOne(new User({email, password})) 
        return res.json({
        error: "Register success"
    })
    } catch (error) {
        return res.status(400).json({
            error: "Register failed"
        })
    }
    
  



}