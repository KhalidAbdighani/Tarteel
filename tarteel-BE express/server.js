const express = require("express")
const app = express()
const path =require("path")
require('dotenv').config();
const {User}=require("./models/users")
const mongoose= require("mongoose") 
const cors = require("cors")
const cookieParser = require('cookie-parser');
const morgan = require("morgan");

app.use(morgan("dev"));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{ 
    console.log("Connected to the database successfully")
})
.catch((err)=>{
    console.log(err)
})



const {router}= require("./routers/Auth-rout") 
const {routerD}= require("./routers/dashboard-rout") 
const{routerP}=require("./routers/profile-rout")
const{routerS}=require("./routers/showusers-rout")
const{routerL}=require("./routers/logout-rout")
const{routerR}=require("./routers/recitations-rout")



app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use(express.static("../public"))
app.use("/Avatars",express.static("./Avatars"))
app.use(
    "/Recitations",
    express.static(path.join(__dirname, "Recitations"))
);



app.use(express.urlencoded({extended:false}))
app.use(router,routerP,routerS,routerL,routerR)


 





app.listen(process.env.PORT, ()=>{
    console.log("Connected to the server successfully")
})

