const router = require("express").Router();
const User=require('../../toolbox/models/admin/admin')
const Checkpoint=require('../../toolbox/models/checkPoints/checkpoints')
const verifyy = require("../../toolbox/helpers/verifyToken");
const jwt = require("jsonwebtoken");
const checkpoints = require("../../toolbox/models/checkPoints/checkpoints");
const Errors=require('../../toolbox/errors')
const config=require('../../config')
const {
  BadRequest,
  CustomError,
  STATUS_CODES,
  UnAuthenticatedError,
  UnAuthorisedError
} = Errors;



//add checkpoints 
router.post("/add",verifyy,async(req,res,next)=>{
 
   try{

        const token =req.body.token || req.query.token || req.headers["auth-token"];
        const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
        const user = await User.findById({ _id: decode._id });
        if(user.issuperAdmin)
        {
          const {lattitude ,longitude,title,about,rating}=req.body;
          if(!lattitude || !longitude || ! title || ! about || !rating)
          {
            throw new CustomError("Please add all the required field! !",STATUS_CODES.NOT_FOUND)
          }
          else
          {
            const newCheckpoints = new Checkpoint(req.body);
            newCheckpoints.addedby=user
            try 
            {
                const savedCheckpoint = await newCheckpoints.save();
                res.json(savedCheckpoint);
            } catch (err) 
            {
              throw new BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
            }
          }
         
        }
        else
        {
          throw new UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
        }
   }catch(err){

    return next(err)
   }
    
});


//get all checkpoints
router.get("/", verifyy, async (req, res,next) => {
   try {
     const allCheckPoints = await Checkpoint.find();
     res.send(allCheckPoints);
   } catch (err) {
    return next(err)
   }
 });


 //get particular checkpoints
 router.get("/:id", verifyy, async (req, res,next) => {
   try{

    const token =req.body.token || req.query.token || req.headers["auth-token"];
    const decode = jwt.verify(token,  config.JWT_TOKEN_SECRET);
    const user = await User.findById({ _id: decode._id });
    if(user.issuperAdmin)
    {
 
        try {
            const toBeUpdated=await checkpoints.findById(req.params.id)
            if(toBeUpdated.isdeleted)
            {
              
              throw new CustomError("Data you are looking for do not exists! !",STATUS_CODES.NOT_FOUND)
            }
            else{
  
              const particularCheckpoint = await checkpoints.findById(req.params.id);
              res.json(particularCheckpoint);
            }
          } catch (err) {
          throw new BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
          }
    }
    else{
     throw new UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
    }
   }
   catch(err){

    return next(err)
   }
  
   
 });

//update checkpoint
router.put("/:id", verifyy, async (req, res,next) => {
  try{

    const token =req.body.token || req.query.token || req.headers["auth-token"];
    const decode = jwt.verify(token,  config.JWT_TOKEN_SECRET);
    const user = await User.findById({ _id: decode._id });
  if (user.issuperAdmin) {
    try {
        const toBeUpdated=await checkpoints.findById(req.params.id)
        if(toBeUpdated.isdeleted)
        {
           throw new CustomError("Data has been deleted, so you can not update !",STATUS_CODES.NOT_FOUND)
        }
        else{

              const updatedMCheckpoint = await checkpoints.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            );
            res.json(updatedMCheckpoint );
        }
       
    } catch (err) {
      throw new BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
  } else {
   throw UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
  }
  }catch(err){

    return next(err)
  }
   
 });



//delete checkpoint
/*
when we call delete ,in real time we actually dont delete data but just updated the status 
is deleted true because in future we may need this data
as to show user that we have deleted data, if we will find chekcpoints.isdeleted==true, mean data is no more
*/
router.delete("/:id", verifyy, async (req, res,next) => {
  try{

      const token =req.body.token || req.query.token || req.headers["auth-token"];
      const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
      const user = await User.findById({ _id: decode._id });
    if (user.issuperAdmin) {
      try {
        const toBeDeleted=await checkpoints.findById(req.params.id)
        if(toBeDeleted.isdeleted)
        {
            throw new CustomError("Data has already been deleted!",STATUS_CODES.NOT_FOUND)
        }
        else
        {

          const updatedMCheckpoint = await checkpoints.findByIdAndUpdate(
            req.params.id,
            {
              isdeleted: true,
            },
            { new: true }
          );
          res.send("check-points has been deleted sucessfully");
        }
      
      } catch (err) {
        throw new CustomError("Data has already been deleted!",STATUS_CODES.NOT_FOUND)
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