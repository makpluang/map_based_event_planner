const mongoose = require("mongoose");

const checkpoint_schema = new mongoose.Schema(
{
    lattitude: 
    {
        type: String,
        require: "Content is Required"
    },
    longitude: 
    {
        type: String,
        require: "Content is Required"
    
    },
    title:
    {
        type: String,
        require: "Content is Required"
    },
    about:
    {
        type: String,
        require: "Content is Required"
    },
    addedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating:{
        type:Number
    },
    date:{
         type: Date, default: Date.now 
        },
    meta: [
        Object
    ],
    image:
    {
        type:String
    },
    isassigned:
    {
        type: Boolean, 
        default: false
        
    }
});

module.exports = mongoose.model("Checkpoint", checkpoint_schema);