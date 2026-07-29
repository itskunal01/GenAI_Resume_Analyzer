const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username:{
    type:String,
    unique:[true,"username Already taken"],
    required: true
   },

   email:{
    type:String,
    unique:[true,"Account already exixts with this email"],
    required:true, 
    },

    password:{
        type:String,
        required:true,
    }
})


const userModel = mongoose.model("Users",userSchema);

module.exports = userModel;