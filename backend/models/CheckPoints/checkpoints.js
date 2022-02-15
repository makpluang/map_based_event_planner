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
    about:
    {
        type: String,
        require: "Content is Required"
    },
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