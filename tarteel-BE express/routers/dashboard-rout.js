const express= require("express")
const routerD= express.Router()
const {getdashboard}=require("../controllers/dashboard-controller")


routerD.get("/dashboard",getdashboard)

module.exports={routerD}