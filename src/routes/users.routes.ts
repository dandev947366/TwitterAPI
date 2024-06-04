import {Router} from 'express'
import {loginValidator, registerValidator} from '../middlewares/users.middlewares'
import { loginController} from '../controllers/users.controllers';

const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)
usersRouter.post(
    '/register', 
    registerValidator, 
    registerController,
    (err, req, res, next) => {
        console.log("Err: ", err.message)
        res.status(400).json({error:err.message})
    }
    )


export default usersRouter