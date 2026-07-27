const {User}=require("../models/users")
const mongoose= require("mongoose")

const showusers = async (req,res)=>{

    try{
        const users = await User.find().select("First Last Avatar Bio user_id")
        return res.status(200).json(users)

    }
    catch{
        res.status(500).json({msg:"server erorr"})
    }
    

}

const showusers2 = async (req,res)=>{
    const userId= req.params.userId
    console.log("usre id is : " , userId)

    try{
        const user = await User.findById(userId); 
        if(user){
            return res.status(200).json(user)
        } else{
            res.status(404).json({
                msg:"user was not found"
            })
        }
    }
    catch{
        res.status(500).json({
            msg:"server error"
        })
    }
}


module.exports={showusers, showusers2}