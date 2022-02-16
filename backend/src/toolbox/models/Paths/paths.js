const mongoose = require("mongoose");

const allpaths_schema = new mongoose.Schema(
{
    routes: 
    [
        Object
    ]
});

AllPaths = mongoose.model("Allpaths", allpaths_schema);




module.exports = AllPaths;