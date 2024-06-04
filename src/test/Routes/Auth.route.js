const express = require('express')
const router = express.Router()


//ANCHOR - REGISTER
router.post('/register', async(req, res, next)=>{
    res.send('register router')

})

//ANCHOR - LOGIN
router.post('/login', async(req, res, next)=>{
    res.send('login router')

})


//ANCHOR - REFRESH TOKEN
router.post('/refresh-token', async(req, res, next)=>{
    res.send('refresh-token router')

})


//ANCHOR - LOGOUT
router.post('/logout', async(req, res, next)=>{
    res.send('logout router')

})





module.export = router