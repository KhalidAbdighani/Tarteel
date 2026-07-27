const Recitations= require("../models/Recitations")
const jwt = require("jsonwebtoken");

const postrecitations = async(req, res)=>{

    try{
        const audio = req.files.Audio[0].filename;
    const image = req.files.Image[0].filename;
    const surah = req.body.Surah;

    const token= req.cookies.Token
        if(!token){
            return res.status(401).json({
                msg:"you need to sign in"
            })
        }
    
    
    const decoded= jwt.verify(token, process.env.JWT_SECRET)

    const recitation = await Recitations.create({

    userId: decoded.userId,
    

    Surah: req.body.Surah,

    Audio:audio,

    Image: image

});
res.status(201).json(recitation);

    } catch{
        res.status(500).json({
            msg:"something went wrong"
        })
    }
    
  

}

const getRecitations = async (req, res) => {

    const recitations = await Recitations.find().populate("userId");

    res.json(recitations);

}

module.exports={postrecitations,getRecitations}