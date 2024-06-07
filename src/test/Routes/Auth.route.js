const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('../Models/User.model');
const bcrypt = require('bcrypt'); // For password hashing
const {authSchema} = require('../helpers/validation_schema')




// REGISTER
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
        res.status(201).send(savedUser);
    } catch (error) {
    if(error.isJoi){error.status=422}
        next(error);
    }
});

// LOGIN
router.post('/login', async (req, res, next) => {
    res.send('login router');
});

// REFRESH TOKEN
router.post('/refresh-token', async (req, res, next) => {
    res.send('refresh-token router');
});

// LOGOUT
router.post('/logout', async (req, res, next) => {
    res.send('logout router');
});

module.exports = router;
