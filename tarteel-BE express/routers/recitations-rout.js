const express= require("express")
const routerR= express.Router()
const {postrecitations,getRecitations}=require("../controllers/recitations-controller")
const upload = require("../config/multer");

routerR.post("/recitations", upload.fields([
     { name: "Audio", maxCount: 1 },
    { name: "Image", maxCount: 1 }
]), postrecitations)

routerR.get("/recitations", getRecitations);

module.exports = {routerR}