const path = require("path")
const {User}=require("../models/users")
const jwt = require('jsonwebtoken');


const getdashboard= async(req,res)=>{
 const token= req.cookies.Token
    if(!token){
        return res.status(401).json({
            msg:"you need to sign in"
        })
    }


    const decoded= jwt.verify(token, process.env.JWT_SECRET)



    const user= await User.findById(decoded.userId)


    return res.json(user)
    




}
module.exports= {getdashboard}