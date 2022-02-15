const router = require("express").Router();
const User=require('../../models/Admin/admin')
const Checkpoint=require('../../models/CheckPoints/checkpoints')

//add checkpoints 
router.post("/add",async(req,res)=>{
 
    const user = await User.find();
   
    if(user[0].issuperAdmin)
    {
       const newcheckpoints = new Checkpoint(req.body);
       //I have to add added by dynamically here ,in cases I have created token based authrization
       //and I wiil have to extract property of logged in admin from auth-token
       newcheckpoints.addedby=user[0]
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