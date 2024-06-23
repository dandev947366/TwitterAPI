const express = require('express');
import usersRouter from "./routes/users.routes";
import databaseService from './services/database.services'
const app = express();
const port = 3000;
import { config } from 'dotenv';
config();
app.use(express.json())
app.use('/users', usersRouter);

//ERROR HANDLER
app.use((err, req, res, next)=>{
  res.status(400).json({error: err.message})
})

databaseService.connect()

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
