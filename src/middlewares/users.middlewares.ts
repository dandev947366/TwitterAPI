import { Request, Response, NextFunction } from 'express'
import {checkSchema} from 'express-validator'
import {validate} from '../utils/validation'
export const loginValidator = (req: Request, res: Response , next: NextFunction) => {

    console.log(req.body)
    const { email, password } = req.body
    if(!email || !password) {
        return res.status(400).json({
            error: 'Missing email or password'
        })
    }
    
    next()

}

export const registerValidator = validate(checkSchema({
    username: { 
        notEmpty: true, 
        isString: true,
        isLength: { options: { min: 1, max: 100 } } ,
        trim: true,
    },
    email: { 
        isEmail: true,
        notEmpty: true,
        trim: true
    },
    password: { 
        isLength: { options: { min: 6, max: 50 } },
        notEmpty: true,
        isString: true,
       
        isStrongPassword: {
            options:{
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: 'Password must be at least 6 characters. 1 lowercase, 1 uppercase, 1 number, and 1 symbol'
         }
    },
    confirm_password: { 
        isLength: { options: { min: 6, max: 50 } },
        notEmpty: true,
        isString: true,
       
        isStrongPassword: {
            options:{
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }
         }
    },
    date_of_birth:{
        isISO8601: {
            options: {
                strict: true,
                strictSeparator: true
            }
        }
    
    }
    
    
    
  }))
  
  
