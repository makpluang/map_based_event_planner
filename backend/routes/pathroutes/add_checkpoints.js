const router = require("express").Router();
const User=require('../../models/Admin/admin')
const Checkpoint=require('../../models/CheckPoints/checkpoints')

//add checkpoints 
router.post("/add",async(req,res)=>{
 
    const user = await User.find();
   
    if(user[0].issuperAdmin)
    {
       const newcheckpoints = new Checkpoint(req.body);
       try 
       {
          const savedCheckpoint = await newcheckpoints.save();
          res.json(savedCheckpoint);
       } catch (err) 
       {
          res.json(err);
       }
    }
    else
    {
       res.send("You are not allowed!");
    }
  });


module.exports = router;