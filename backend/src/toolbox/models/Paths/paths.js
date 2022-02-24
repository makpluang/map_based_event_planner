const mongoose = require("mongoose");

const completePathSchema = new mongoose.Schema(
{
    routes: 
    [
        Object
    ]
});

AllPaths = mongoose.model("Allpaths", completePathSchema);




module.exports = AllPaths;