const multer = require("multer");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        if(file.fieldname === "Avatar"){
            cb(null,"Avatars")
        }
          else if(file.fieldname === "Audio"){
            cb(null,"Recitations/Audio")
        }
          else if(file.fieldname === "Image"){
            cb(null,"Recitations/Image")
        }
        
        

    },
    filename: function(req, file, cb){
        
        cb(null, Date.now()+"_"+ file.originalname)
    }


})

const upload = multer({
    storage:storage
})

 module.exports= upload