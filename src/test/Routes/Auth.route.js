const express = require('express');
const router = express.Router();

// REGISTER
router.post('/register', async (req, res, next) => {
    res.send('register router');
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
