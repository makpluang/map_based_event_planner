const mongoose = require("mongoose");

const path_schema = new mongoose.Schema(
{
    route: 
    [
       // {
          //type: mongoose.Schema.Types.ObjectId,
          //ref: "Checkpoint"
        //}
        Object
    ],
    isassigned:
    {
        type: Boolean, 
        default: false
        
    }
});

Path= mongoose.model("Path", path_schema);


module.exports = Path;
