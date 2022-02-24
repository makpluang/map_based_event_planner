const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        unique:true,
        min:6,
        max:250,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024,
    },
    issuperAdmin: { type: Boolean, default: true },
    isdeleted: { type: Boolean, default: false}
    
});

module.exports = mongoose.model("User", adminSchema);