const mongoose= require("mongoose")
const schema = mongoose.Schema
const usersSchema= new schema({
    First: {
        type: String,
        required: true
        },

    Last: {
        type: String,
        required: true},

    Email: {
        type: String,
        required: true,
        unique:true,
        lowercase:true},

    Password: {
        type: String ,
         required: true}, 

    Bio:      {
        type:String},


    Title:    {
        type:String},

    Country:  {

        Type:String},
    
    Avatar:    {
        type:String
    },
    Recitation:{
        type:String

    }

        })


const User= mongoose.model("User", usersSchema)
module.exports={User};
