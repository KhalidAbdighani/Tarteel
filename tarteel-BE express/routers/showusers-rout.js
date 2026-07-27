const express= require("express")
const routerS= express.Router()
const {showusers, showusers2}=require("../controllers/showusers-controller")

routerS.get("/showusers", showusers)
routerS.get("/showusers2/:userId", showusers2)

module.exports={routerS}