import { Request, Response, NextFunction } from 'express'
import userService from '../services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '../models/requests/User.requests'

// LOGIN CONTROLLER
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body

  if (email === 'dan123@gmail.com' && password === '123456') {
    return res.status(200).json({
      message: 'Login success'
    })
  }

  return res.status(400).json({
    error: 'Login failed'
  })
}

// REGISTER CONTROLLER
export const registerController = async (
    req: Request<ParamsDictionary, any, RegisterReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Check if the email already exists
      const existingUser = await userService.checkEmailExist(req.body.email);
      if (existingUser) {
        return res.status(400).json({
          message: 'Email already exists'
        });
      }
  
      // Register the user
      const result = await userService.register(req.body);
      console.log('User registered successfully:', result);
  
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({
        message: 'Failed to register user',
        error: error.message
      });
    }
  };
