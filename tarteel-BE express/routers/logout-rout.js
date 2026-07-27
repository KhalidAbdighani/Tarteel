const express= require("express")
const routerL= express.Router()
const {postlogout}=require("../controllers/logout-controller")

routerL.post("/logout", postlogout)

module.exports= {routerL}