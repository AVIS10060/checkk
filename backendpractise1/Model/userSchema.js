const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")




const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'username is required'],
        minLength : [5,"name must "]
    },
    email:{
        trim:true,
        type:String,
    },
    password:{
        type:String,
    },
    ForPasswordExpiryDate:{
        type:Date
    },
    
})

userSchema.methods = {
    jwtToken(){
        return jwt.sign({id:this._id,email:this.email},
            process.env.SECRET,
            {expiresIn : '24h'}
        )
    }
}



const userModel = mongoose.model('user',userSchema)

module.exports = userModel
