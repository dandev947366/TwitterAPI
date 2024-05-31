import {Router} from 'express'
import {loginValidator} from '../middlewares/users.middlewares'
import {loginController, registerController} from '../controllers/users.controllers'
import databaseService from '../services/database.services'
import User from '../models/schemas/User.schema'
const usersRouter = Router()


usersRouter.post('/login', loginValidator, loginController, (req, res) =>{

    res.json({
        message: "Login success"
    });
})
usersRouter.post('/register', registerController, (req, res) =>{
    const { email, password } = req.body
   
    databaseService.users.insertOne(new User({email, password}))
    res.json({
        message: "Register success"
    });


})
export default usersRouter