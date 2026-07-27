const {User}=require("../models/users")
const mongoose= require("mongoose")
const path = require("path")

// code saver 
const NodeCache = require("node-cache");
const usercache = new NodeCache({stdTTL:600})


const getregister=(req,res)=>{
    res.json({
        msg:"welcome"
    })

}


const postregister= async(req,res)=>{   
    try{
        const {First,Last,Email,Password}= req.body; // الريك بودي فيه الاوجكت الي ارسلناه والي فيه المعلومات، نحن رح نحفظ منها الاسم الاول والاخير بس عشان نستخدمها لاحقا
        const user= new User()
        user.First=First;
        user.Last= Last;
        user.Email=Email;
        user.Password=Password;

        const EmailController = await User.findOne({Email})
        if(EmailController){

            return res.status(400).json({
                msg: "Email was already taken"
            })

        }else{

            const otpCode = Math.floor(100000 + Math.random() * 900000);
            usercache.set(Email,{...req.body,otpCode})
            
            const mailOptions = {
            from: '"Tarteel | ترتيل" <tarteel.app@gmail.com>',
            to: Email, // الإيميل اللي جاني من الـ req.body
            subject: 'Your verification code',
            html: `
            <div style=" font-family: sans-serif;">
            <h1  style="color: #000000;"> Hello ${First}</h1>
            <h2 style="color: #000000;"> Welcome to tarteel</h2>
            <h4>To complete your rgisteration plese verify your account</h4>
            <p>Your verification code is:</p>
            <h1 style="color: #1893ff; letter-spacing: 5px;">${otpCode}</h1>
            </div>`};

            try {
                await transporter.sendMail(mailOptions);
                res.status(200).json({msg: "Verification code sent to your email"})

            } catch (error) {

                }

        }
      
    } catch(err){

        console.log(err)
        }
        
}

// / new fuction 
const verify = async (req,res)=>{
try{

    const {Email,code}= req.body;
    const CachedData = usercache.get(Email)

    if(!CachedData){
        return res.status(400).json({msg:"Email not found or verification code was expired"})
    }

  

    if(CachedData.otpCode == code){

        const Newuser = new User({
        First: CachedData.First,
        Last: CachedData.Last,
        Email: CachedData.Email,
        Password: CachedData.Password
    })

        await Newuser.save()
        usercache.del(Email)
        return res.status(200).json({msg:`welcome ${Newuser.First} ${Newuser.Last}`})

    }else{
        return res.status(400).json({
            msg:"The number you entered is incoreect"
        })
    }
}

catch{
    return res.status(400).json({msg:"Somthing went wrong while verifying"})

}
}



// email sender 
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'tarteel.quraan.app@gmail.com', // إيميلك
    pass: process.env.EMAIL_PASS   // الـ App Password الـ 16 حرف
    }
});



module.exports={getregister,postregister,transporter,verify}