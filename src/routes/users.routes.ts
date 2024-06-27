import { Router, Request, Response, NextFunction } from 'express'
import { loginValidator, registerValidator } from '../middlewares/users.middlewares'
import { loginController, registerController } from '../controllers/users.controllers'

const usersRouter = Router()

usersRouter.post('/login', loginValidator,loginController)

usersRouter.post('/register', registerValidator, registerController)
usersRouter.post('/logout', (req: Request, res: Response) => {
    
    res.status(200).json({ message: 'Logout success' });
});

// Error-handling middleware
usersRouter.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error: ', err.message);
    res.status(400).json({ error: err.message });
});

export default usersRouter
