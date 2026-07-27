










const postlogout = (req,res)=>{

    res.clearCookie("Token")
    return res.status(200).json({
        msg:"logged out"
    })

}
module.exports={postlogout}