const router = require("express").Router();
const Checkpoints=require('../../toolbox/models/checkPoints/checkpoints')
const Path=require('../../toolbox/models/Path/path')
const User=require('../../toolbox/models/admin/admin')
const veriffy=require('../../toolbox/helpers/verifyToken')
const jwt = require("jsonwebtoken");
const Errors=require('../../toolbox/errors')
const config=require('../../config')
const {
  BadRequest,
  CustomError,
  STATUS_CODES,
  UnAuthenticatedError,
  UnAuthorisedError
} = Errors;




//create a path by selecting some check points
//number of check points to added will be passed as a prams
//this path can be seen by admin,user dont know about this database
//purpose of this model is to give flexibilty to admin adding multiple path to this database without disturbing exposed paths
//and when in future he needed, can expose this path for user purpose

router.post("/create/:points",veriffy,async(req,res,next)=>{
  
  try{

    const token =req.body.token || req.query.token || req.headers["auth-token"];
    const decode = jwt.verify(token,config.JWT_TOKEN_SECRET);
    const user = await User.findById({ _id: decode._id });
    console.log(user)
    if(user.issuperAdmin)
    {
          const checkpoints=await Checkpoints.find();
          if(checkpoints.length==0)
          {
            throw new CustomError("There is no checkpoints, so you will not be able to create path!",STATUS_CODES.NOT_FOUND)
          }
          else
          {
            const {points}=req.params;
            let selectedCheckpoints;
            if(checkpoints.length>=points)
            {
                selectedCheckpoints=checkpoints.slice(0,points);
            }
            else
            {
              selectedCheckpoints=checkpoints.slice(0,checkpoints.length);
            }
            const path = new Path();
            path.route = selectedCheckpoints
            await path.save();
            res.send(`Path created with ${selectedCheckpoints.length} checkpoints ,successfully`);
        }
      }
    else
    {
       
        throw new UnAuthorisedError("Not an Admin !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
    }
  }
  catch(err){
   
    return next(err)
  }

  });

  /*
  
    get all the paths which are created by the administrator
    remember this path yet has not been exposed for user purposes
    to see the exposed route please visite paths route 
  */
  router.get('/',async(req,res,next)=>{
    
    try{
          const token =req.body.token || req.query.token || req.headers["auth-token"];
          const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
          const user = await User.findById({ _id: decode._id });
          if(user.issuperAdmin){

            const allPath=await Path.find();
            res.send(allPath)
          }
          else{

            throw new UnAuthorisedError("Not an Admin !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
          }
     }
    catch(err)
    {
      return next(err)
    }
    
  })


//get path by id
router.get("/:id", veriffy, async (req, res,next) => {
  try{
        const token =req.body.token || req.query.token || req.headers["auth-token"];
        const decode = jwt.verify(token,config.JWT_TOKEN_SECRET);
        const user = await User.findById({ _id: decode._id });
        if (user.issuperAdmin) {
          try {
                const isPathExist=await Path.findById(req.params.id)
                if(isPathExist.isdeleted)
                {
                  throw new CustomError("Path no more exists in the database!",STATUS_CODES.NOT_FOUND)
                }
                else
                {
                    return res.send(isPathExist)
                }
          
          } catch (err) {
            throw new CustomError('Looks like,No checkpoints available to create path !',STATUS_CODES.NOT_FOUND)
          }
        } else {
        throw new UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
  }
  }catch(err){

      return next(err)
  }
  
});


/*
when we call delete ,in real time we actually dont delete data but just updated the status 
is deleted true because in future we may need this data
as to show user that we have deleted data, if we will find path.isdeleted==true, mean data is no more
*/
  router.delete("/:id", veriffy, async (req, res,next) => {
    try{

      const token =req.body.token || req.query.token || req.headers["auth-token"];
      const decode = jwt.verify(token,  config.JWT_TOKEN_SECRET);
      const user = await User.findById({ _id: decode._id });
      if (user.issuperAdmin) {
        try {
              const toBeDeleted=await Path.findById(req.params.id)
              if(toBeDeleted.isdeleted)
              {
                  throw new CustomError("Path has already been deleted !",STATUS_CODES.NOT_FOUND)
              }
              else
              {
                  const DeletedPath = await Path.findByIdAndUpdate(
                  req.params.id,
                  {
                    isdeleted: true,
                  },
                  { new: true }
                );
                res.send("Path has been deleted sucessfully");
              }
        
        } catch (err) {
          throw new CustomError('Looks Like,path is no more in the database!',STATUS_CODES.NOT_FOUND)
        }
      } else {
      throw new UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
      }
    }
    catch(err){

        return next(err)
    }
    
  });
module.exports = router;