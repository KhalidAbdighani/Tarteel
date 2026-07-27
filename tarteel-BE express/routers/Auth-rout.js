const express= require("express")
const router= express.Router()
const {getregister,postregister,verify} =require("../controllers/register-controller")
const {getlogin,postlogin} =require("../controllers/login-controller")
const {getdashboard} =require("../controllers/dashboard-controller")



// registr router
router.post("/register",postregister);
router.get("/register",getregister);

//login router
router.get("/login",getlogin)
router.post("/login",postlogin)

router.get("/dashboard", getdashboard)
router.post("/otp", verify)




module.exports={router}