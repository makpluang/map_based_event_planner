
const Checkpoints=require('../../toolbox/models/checkPoints/checkpoints')
const Path=require('../../toolbox/models/Path/path')
const User=require('../../toolbox/models/admin/admin')
const jwt = require("jsonwebtoken");
const Errors=require('../../toolbox/errors')
const config=require('../../config')
const {

  CustomError,
  STATUS_CODES,
  UnAuthorisedError
} = Errors;
const createNewPath=async(req,res)=>{

    const token =req.body.token || req.query.token || req.headers["auth-token"];
    const decode = jwt.verify(token,config.JWT_TOKEN_SECRET);
    const user = await User.findById({ _id: decode._id });
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

const getAllCreatedPaths=async(req,res)=>{

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

const getPathById=async(req,res)=>{

        const token =req.body.token || req.query.token || req.headers["auth-token"];
        const decode = jwt.verify(token,config.JWT_TOKEN_SECRET);
        const user = await User.findById({ _id: decode._id });
        if (user.issuperAdmin) {
          
                const isPathExist=await Path.findById(req.params.id)
                if(isPathExist.isdeleted)
                {
                  throw new CustomError("Path no more exists in the database!",STATUS_CODES.NOT_FOUND)
                }
                else
                {
                    return res.send(isPathExist);
                }
          
      
        } else {
        throw new UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
    }
}


const deleteParticularPath=async(req,res)=>{
      const token =req.body.token || req.query.token || req.headers["auth-token"];
      const decode = jwt.verify(token,  config.JWT_TOKEN_SECRET);
      const user = await User.findById({ _id: decode._id });
      if (user.issuperAdmin) {
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
                console.log(DeletedPath)
                res.send("Path has been deleted sucessfully");
              }
        } else {
      throw new UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
      }
}



module.exports = {createNewPath,getAllCreatedPaths,getPathById,deleteParticularPath}