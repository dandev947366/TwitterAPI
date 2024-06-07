const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('../Models/User.model');
const bcrypt = require('bcrypt'); // For password hashing
const {authSchema} = require('../helpers/validation_schema')
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt_helper')



//ANCHOR -  REGISTER
router.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authSchema.validateAsync(req.body)
        console.log(result)
        
        
        if (!email || !password) {
            throw createError.BadRequest('Email and password are required');
        }
        

        const doesExist = await User.findOne({ email: result.email });
        if (doesExist) {
            throw createError.Conflict(`${result.email} already exists`);
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = new User(result);
        const savedUser = await user.save();
        
        //ACCESS & REFRESH TOKEN
        const accessToken = await signAccessToken(savedUser.id)
        const refreshToken = await signRefreshToken(savedUser.id)
        
        res.status(201).send(accessToken, refreshToken);
    } catch (error) {
    if(error.isJoi){error.status=422}
        next(error);
    }
});

//ANCHOR -  LOGIN
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        const result = await authSchema.validateAsync(req.body);

        // Check if email and password are provided
        if (!email || !password) {
            throw createError.BadRequest('Email and password are required');
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw createError.NotFound('User not found');
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw createError.Unauthorized('Invalid email or password');
        }

        // If authentication is successful, generate an access token
        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id)
        // Send the access token as a response
        res.status(200).send({
            accessToken,
            refreshToken
        });

    } catch (error) {
        // Handle errors
        if (error.isJoi) {
            error.status = 422; // Set status to 422 for validation errors
        }
        next(error); // Pass the error to the error handling middleware
    }
});


//ANCHOR -  REFRESH TOKEN
router.post('/refresh-token', async (req, res, next) => {
    try {
       const { refreshToken } = req.body;
       if (!refreshToken) {
          throw createError.BadRequest();
       }
       
       const userId = await verifyRefreshToken(refreshToken);
     
       const accessToken = await signAccessToken(userId);
       const newRefreshToken = await signRefreshToken(userId);
       
       res.send({
        accessToken: accessToken,
        refreshToken: newRefreshToken
       });
    } catch (error) {
       next(error);
    }
 });
 

//ANCHOR -  LOGOUT
router.post('/logout', async (req, res, next) => {
    res.send('logout router');
});

module.exports = router;
