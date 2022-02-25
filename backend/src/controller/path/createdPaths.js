
const AllPaths=require('../../toolbox/models/Paths/paths')
const Path=require('../../toolbox/models/Path/path')
const User=require('../../toolbox/models/admin/admin')

const jwt = require("jsonwebtoken");
const Errors=require('../../toolbox/errors')
const config=require('../../config')
const  { BootcampProjectCache, redisClient }=require('../../wrappers/bootcamp-project-cache/bootcampCache')
const {
  CustomError,
  STATUS_CODES,
  UnAuthorisedError
} = Errors;
const exposedPathTouser=async(req,res)=>{

    const token =req.body.token || req.query.token || req.headers["auth-token"];
    const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
    const user = await User.findById({ _id: decode._id });
    if(user.issuperAdmin)
    {
      const path=await Path.find();
      if(path.length==0)
      {
          throw new CustomError("There is no path which you can select to expose !",STATUS_CODES.NOT_FOUND);
      }
      else
      {
          const {rout}=req.params;
          let selectedPath;
          if(path.length>=rout)
          {
            selectedPath=path.slice(0,rout);
          }
          else
          {
            selectedPath=path.slice(0,path.length);
          }
          const paths = new AllPaths();
          paths.routes = selectedPath;
          await paths.save();
          res.send(`${selectedPath.length} new paths has been added to expose for user`);
      }
  }
  else
  {
    throw new UnAuthorisedError("Not an Admin !",STATUS_CODES.UNAUTHENTICATED_REQUEST);
  }

}
const getAllExposedPath=async(req,res)=>{

    const token =req.body.token || req.query.token || req.headers["auth-token"];
      const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
      const user = await User.findById({ _id: decode._id });
      if(user.issuperAdmin)
      {
        const allPaths=await AllPaths.find();
        res.send(allPaths);
      }
      else
      {
        throw new UnAuthorisedError("Not an Admin !",STATUS_CODES.UNAUTHENTICATED_REQUEST);
      }
}

const assingRandomPathToUser=async(req,res)=>{
    let startPoint=req.params.start;
    let endPoint=req.params.end;
     let key = startPoint.concat("_", endPoint);
     const toBeSendFromCache=await BootcampProjectCache.getCacheByKey(key);
    if(toBeSendFromCache){

      res.send(JSON.parse(toBeSendFromCache));
    }
   else{
          const allPaths=await AllPaths.find();
          var randomIndex2 = Math.floor(Math.random() * allPaths.length);
          var randomylSelectedPath = allPaths[randomIndex2];
          const MultipleRandomRoutes=randomylSelectedPath.routes
          var randomIndexx = Math.floor(Math.random() * MultipleRandomRoutes.length);
          var randomPath = MultipleRandomRoutes[randomIndexx];
          //here I am sending data for the ease of front-end itegration
          //Idea is to send complete path start+waypoints+end as an object
          var newPathObject = new Object();
          newPathObject.start = startPoint;
          newPathObject.end= endPoint;
          newPathObject.paths = randomPath;
          await redisClient.set(key, JSON.stringify(newPathObject));
          res.send(newPathObject);
   }
}
 


module.exports = {exposedPathTouser,getAllExposedPath,assingRandomPathToUser};