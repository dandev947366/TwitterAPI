import {Router} from 'express'
import {loginValidator, registerValidator} from '../middlewares/users.middlewares'
import { loginController} from '../controllers/users.controllers';

const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)
usersRouter.post('/register', registerValidator)


export default usersRouter