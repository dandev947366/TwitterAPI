import { Router, Request, Response, NextFunction } from 'express'
import { loginValidator, registerValidator } from '../middlewares/users.middlewares'
import { loginController, registerController } from '../controllers/users.controllers'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

usersRouter.post('/logout', registerValidator, wrapRequestHandler(registerController))




// usersRouter.post(
//   '/register',
//   registerValidator,
//   registerController,
//   (err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.log('Err: ', err.message)
//     res.status(400).json({ error: err.message })
//   }
// )

export default usersRouter
