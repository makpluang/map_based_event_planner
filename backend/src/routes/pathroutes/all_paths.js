const router = require("express").Router();
const AllPaths=require('../../toolbox/models/Paths/paths')
const Path=require('../../toolbox/models/Path/path')
const User=require('../../toolbox/models/Admin/admin')
const veriffy=require('../../toolbox/helpers/verifyToken')
const jwt = require("jsonwebtoken");
const Errors=require('../../toolbox/errors')
const config=require('../../config')
const {
  UnAuthorisedError, BadRequest, STATUS_CODES
} = Errors;

/*
add path to the paths db so that this path will be exposed for user purpose, as we are considering random selection of path 
from exposed paths model

logic is to take number of path as a param and select path which has been created by admin in past
and this number of path will selected and moved to paths db,which is to be exposed for user purpose
*/

router.post("/add/:rout",veriffy,async(req,res)=>{
    

    try{

      const token =req.body.token || req.query.token || req.headers["auth-token"];
      const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
      const user = await User.findById({ _id: decode._id });
   
      if(user.issuperAdmin)
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
        throw new UnAuthorisedError("Not an Admin !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
      }
    }
    catch(err)
    {
      throw new BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
    
  });



  //get all the paths which are currently exposed for the user purpose
  router.get('/',veriffy,async(req,res)=>{
    try{

      const token =req.body.token || req.query.token || req.headers["auth-token"];
      const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
      const user = await User.findById({ _id: decode._id });
   
      if(user.issuperAdmin)
      {
        const allpaths=await AllPaths.find();
        res.send(allpaths)
      }
      else
      {
        throw new UnAuthorisedError("Not an Admin !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
      }
       
    }
    catch(err)
    {
      throw new BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
    
  })

  //assign path randomly to the current user
  router.get('/pathtofollow/:start/:end',async(req,res)=>{

    try{

     
        const startPoint=req.params.start;
        const endPoint=req.params.end;
        const allpaths=await AllPaths.find();
        var randomIndex2 = Math.floor(Math.random() * allpaths.length);
        var randomly_selected_paths = allpaths[randomIndex2];
        const MultipleRandomRoutes=randomly_selected_paths.routes
        var random_index = Math.floor(Math.random() * MultipleRandomRoutes.length);
        var randomPath = MultipleRandomRoutes[random_index];
        //here I am sending data for the ease of front-end itegration
        //Idea is to send complete path start+waypoints+end
        var newPathObject = new Object();
        newPathObject.start = startPoint;
        newPathObject.end= endPoint;
        newPathObject.paths = randomPath;
        res.send(newPathObject)
    
       
    }
    catch(err)
    {
      throw new BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
    

  })

module.exports = router;