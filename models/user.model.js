const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "please add the user name"]
    },
    email:{
        type:String,
        required:[true, "please add the user email address"],
        unique:[true, "this email is already taken"]
    },
    password:{
        type:String,
        required:[true, "please add the user password"]
    }

},{timestamps:true})

module.exports = mongoose.model("user",userSchema);