const express = require('express');
const app = express();

app.use(express.json());
app.get('/hello', (req, res) => {
  res.send(`Hello, ${req.query.person}!`);
});

app.listen(3000, ()=>{

    console.log("Connecting to localhost 3000")
});