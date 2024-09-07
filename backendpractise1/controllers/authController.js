const userModel = require("../Model/userSchema.js")


const signup = async(req,res,next) =>{
    const {name,email,password,confirmPassword} = req.body

    try{
        const userInfo  = userModel(req.body)
        const result = await(userInfo.save())

        return res.status(200).json(
            {
                success:true,
                data:result
            }
        )
        
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}


const signin = async(req,res)=>{
    const {email,password} = req.body
    try{
        const user =await userModel.findOne({email}).select("+password")

        if(!user || user.password !== password){
            return res.status(400).json({
                succes:false,
                message:"invalid credentials"
            })
        }
        const token = user.jwtToken()
        user.password = undefined
    
        const cookieOption = {
            maxAge:24*60*60*1000,
            httpOnly:true
        }
        res.cookie("token",token,cookieOption)
        res.status(200).json({
            success : true,
            data:user
        })
    
    }
    catch(e){
        res.status(400).json({
            success:false,
            message:e.message
        })
    }

}

const getUser = async(req,res,next)=>{
    const userId = req.user.id
    try{
        const User = await userModel.findById(userId)
        return    res.status(200).json({
            success:true,
            data:User
        })

    }
    catch(e){
        return    res.status(400).json({
            success:false,
            message:e.message
        })
    }


}


module.exports = {
    signup,
    signin,
    getUser
}