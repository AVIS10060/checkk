const dotenv = require("dotenv")
dotenv.config()



// const databaseConfig = require('./config/databaseConfig.js')


const mongoose = require('mongoose')



const MongoDB_URL = "mongodb://localhost:27017/my_database"
const databaseConnect = async()=>{
    try{
        const conn = await mongoose.connect(MongoDB_URL)
        console.log("databaseconnected")
    }
    catch(e){
        console.log(e,"error connnecting db")
    }
}
databaseConnect()


module.exports = databaseConnect


const PORT = process.env.PORT || 5000
const app = require('./app')
app.listen(PORT,()=>{
    console.log("connected")
})