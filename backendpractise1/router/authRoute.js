const express = require('express')
const { signup,getUser } = require('../controllers/authController')
const {signin} = require('../controllers/authController')
const jwtAuth = require('../middleware/jwtAuth')
const authRouter = express.Router()



authRouter.post('/signup',signup)
authRouter.post('/signin',signin)
authRouter.get('./user',jwtAuth,getUser)

module.exports = authRouter