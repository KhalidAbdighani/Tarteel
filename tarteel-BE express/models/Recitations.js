const mongoose = require("mongoose")
const schema= mongoose.Schema

const recitationSchema= new schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
      Surah: {
        type: String,
        required: true,
        ref:"User"
    },
    Audio: {
        type: String,
        required: true,
        ref:"User"
    },
    Image: {
        type: String,
        required: true,
        ref:"User"

    }
})

module.exports= mongoose.model("Recitations", recitationSchema)