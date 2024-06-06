const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('../Models/User.model');
const bcrypt = require('bcrypt'); // For password hashing

// REGISTER
router.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw createError.BadRequest('Email and password are required');
        }

        const doesExist = await User.findOne({ email });
        if (doesExist) {
            throw createError.Conflict(`${email} already exists`);
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = new User({ email, password: hashedPassword });
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (error) {
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
