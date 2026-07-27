const {User}=require("../models/users")
const mongoose= require("mongoose")
const jwt = require('jsonwebtoken');


const path = require("path")

const getlogin=((req,res)=>{
res.status(200).json ({
    msg:"done"
})})


const postlogin=(async(req,res)=>{
    try{

        const {Email,Password}= req.body;
        const EmailController = await User.findOne({Email:Email})
        if(!EmailController){
            return res.status(404).json({msg: "Email was not found"})
        }else if(EmailController.Password===Password){
            const token =jwt.sign(
                {userId: EmailController._id},
                process.env.JWT_SECRET,
                { expiresIn: "24h" }

            )
            res.cookie("Token",token, {
                httpOnly:true,
                maxAge: 60*60*1000
            })
           return res.json({
            msg: "Welcome To Tarteel",
            username: EmailController.First
           })
        }else{
          return  res.status(401).json({
            msg: "Wrong Password"
          })
        }
    } 

    catch(err){
        console.log(err)

    }
    
    
})


module.exports={getlogin,postlogin}