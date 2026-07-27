const {User}=require("../models/users")
const mongoose= require("mongoose")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



const getprofile = async (req,res)=>{

    const token= req.cookies.Token
    if(!token){
        return res.sendStatus(401)
    }


    const decoded= jwt.verify(token, process.env.JWT_SECRET)



    const user= await User.findById(decoded.userId)


    return res.json( user)
}




const putprofile = async(req,res)=>{
        const token= req.cookies.Token

        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        req.body.Avatar= req.file.filename

        const user= await User.findByIdAndUpdate(decoded.userId, req.body,  { new: true })

        


        return res.json(user)

}
module.exports={getprofile,putprofile}