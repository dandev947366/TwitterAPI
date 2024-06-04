import {Router} from 'express'
import {loginValidator, registerValidator} from '../middlewares/users.middlewares'
import { loginController} from '../controllers/users.controllers';

const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)
usersRouter.post(
    '/register', 
    registerValidator, 
    (req, res, next)=>{
        console.log('request handler 1')
        next()
    },
    (req, res, next)=>{
        console.log('request handler 2')
        next()
    },
    (req, res, next)=>{
        console.log('request handler 3')
        res.json({message:"register success"})
    }
    
    
    
    )


export default usersRouter