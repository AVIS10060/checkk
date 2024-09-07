const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser())

const authRouter = require('./router/authRoute.js'); // Corrected require statement
const databaseConnect = require("./index.js");

app.get('/',(req,res)=>{
    res.send("hello")
})

app.use('/api/auth', authRouter); // Use the router
module.exports = app
