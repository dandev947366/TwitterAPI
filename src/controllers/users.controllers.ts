import { Request, Response, NextFunction } from 'express'
import databaseService from '../services/database.services'
import User from '../models/schemas/User.schema'
import { ParamsDictionary } from 'express-serve-static-core'
import {RegisterReqBody} from '../models/requests/User.requests'


//LOGIN CONTROLLER
export const loginController = (req: Request, res: Response) => {

    const {email, password} = req.body
    if(email == 'dan123@gmail.com' && password=='123456'){
        return res.status(200).json({
            message: "Login success"
        })
    }
    return res.status(400).json({
        error: "Login failed"
    })

}

//REGISTER CONTROLLER
export const registerController = async (
    req: Request<ParamsDictionary, any, RegisterReqBody>,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        const user = new User({ email, password });
        const result = await databaseService.users.insertOne(user);

        return res.json({
            message: "Register success",
            userId: result.insertedId,
        });
    } catch (error) {
        next(error);
    }
};


