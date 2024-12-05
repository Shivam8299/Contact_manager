const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    name:{
        type:String,
        required:[true, 'please add the constact name'],
        unique:true
    },
    email:{
        type:String,
        required:[true, 'please add the constact email address'],
        unique:true
    },
    phone:{
        type:String,
        required:[true, 'please add the constact number'],
        unique:true
    },
},{timestamps:true})

module.exports = mongoose.model("contact",contactSchema)
 