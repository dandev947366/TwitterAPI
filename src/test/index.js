const express = require('express');
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
const AuthRoute = require('./Routes/Auth.route')
const {verifyAccessToken} = require('./helpers/jwt_helper')
const app = express();
app.use(morgan('dev'))

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', verifyAccessToken, async (req, res, next) => {
  

  res.send(`Hello, ${req.query.person}!`);
});



app.use('/auth', AuthRoute)

app.use(async (req, res, next) =>{
  next(createError.NotFound('Rout not exist'))
})

app.use((err, req, res, next)=>{
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })

})

app.listen(3000, ()=>{

    console.log("Connecting to localhost 3000")
});