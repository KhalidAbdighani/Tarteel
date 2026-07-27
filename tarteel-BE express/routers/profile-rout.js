const express= require("express")
const routerP= express.Router()
const {getprofile,putprofile} =require("../controllers/profile-controller")
const upload = require("../config/multer");



routerP.get("/profile", getprofile)
routerP.put("/profile", upload.single("Avatar"),  putprofile)

module.exports={routerP}
