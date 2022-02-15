const router = require("express").Router();
const AllPaths=require('../../models/Paths/paths')
const Path=require('../../models/Path/path')
const User=require('../../models/Admin/admin')
/*
add path to the paths db so that this path will be exposed for user purpose, as we are considering random selection of path 
from exposed paths model

logic is to take number of path as a param and select path which has been created by admin in past
and this number of path will selected and moved to paths db,which is to be exposed for user purpose
*/

router.post("/add/:rout",async(req,res)=>{
    

    try{

      const user = await User.find();
   
      if(user[0].issuperAdmin)
      {
        const path=await Path.find();
        if(path.length==0)
        {
          res.send("There is no path which you can select to expose")
        }
        else
        {
            const {rout}=req.params;
            var selected_paths
            if(path.length>=rout)
            {
              selected_paths=path.slice(0,rout);
            }
            else
            {
              selected_paths=path.slice(0,path.length);
            }
            const paths = new AllPaths();
            paths.routes = selected_paths
            await paths.save();
            res.send(`${selected_paths.length} new paths has been added to expose for user`)
        }
        
        
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
    
  });



  //get all the paths which are currently exposed for the user purpose
  router.get('/',async(req,res)=>{
    try{

      const user = await User.find();
   
      if(user[0].issuperAdmin)
      {
        const allpaths=await AllPaths.find();
        res.send(allpaths)
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

  //assign path randomly to the current user
  router.get('/pathtofollow',async(req,res)=>{

    try{

      const user = await User.find();
   
      if(user[0].issuperAdmin)
      {
        const allpaths=await AllPaths.find();
        //console.log(allpaths)
        //console.log(allpaths.length)
        var rand = Math.floor(Math.random() * allpaths.length);
    
        var concat = allpaths[rand];
        //console.log(concat)
        const Routes=concat.routes
        //console.log(Routes)

        var rand1 = Math.floor(Math.random() * Routes.length);
    
        var concat1 = Routes[rand1];
        //console.log(typeof(concat1))
        res.send(concat1)
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