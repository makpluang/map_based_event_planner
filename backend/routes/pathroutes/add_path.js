const router = require("express").Router();
const Checkpoints=require('../../models/CheckPoints/checkpoints')
const Path=require('../../models/Path/path')
const User=require('../../models/Admin/admin')

//create a path by selecting some check points
//number of check points to added will be passed as a prams
//this path can be seen by admin,user dont know about this database
//purpose of this model is to give flexibilty to admin adding multiple path to this database without disturbing exposed paths
//and when in future he needed, can expose this path for user purpose

router.post("/create/:points",async(req,res)=>{
  
  try{

    const user = await User.find();
   
    if(user[0].issuperAdmin)
    {
          const checkpoints=await Checkpoints.find();
          if(checkpoints.length==0)
          {

            res.send("There is no checkpoints, so you will not be able to create path")
          }
          else
          {

            const {points}=req.params;
            var selected_checkpoints;
            if(checkpoints.length>=points)
            {

              selected_checkpoints=checkpoints.slice(0,points);
            }
            else
            {
              selected_checkpoints=checkpoints.slice(0,checkpoints.length);
            }
            const path = new Path();
            path.route = selected_checkpoints
            await path.save();
            res.send(`Path created with ${selected_checkpoints.length} checkpoints ,successfully`);
        }
      }
    else
    {
        res.send("You are not a super Admin")
    }
  }
  catch(err){
    res.send(err)
  }

  });

  //get all the paths which are created by the administrator
  router.get('/',async(req,res)=>{
    
    try{

      const user = await User.find();
   
      if(user[0].issuperAdmin)
      {
        const getpath=await Path.find();
        res.send(getpath)
      }
      else
      {
        res.send("You are not a super Admin")
      }
       
    }
    catch(err)
    {
      res.send(err);
    }
    
  })

module.exports = router;