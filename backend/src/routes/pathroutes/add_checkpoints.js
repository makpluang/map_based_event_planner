const router = require("express").Router();
const User=require('../../toolbox/models/Admin/admin')
const Checkpoint=require('../../toolbox/models/CheckPoints/checkpoints')
const verifyy = require("../../toolbox/helpers/verifyToken");
const jwt = require("jsonwebtoken");
const checkpoints = require("../../toolbox/models/CheckPoints/checkpoints");
const Errors=require('../../toolbox/errors')
const config=require('../../config')
const {
  UnAuthorisedError, BadRequest, STATUS_CODES, ErrorCodes,
} = Errors;


//add checkpoints 
router.post("/add",verifyy,async(req,res)=>{
    const token =req.body.token || req.query.token || req.headers["auth-token"];

    const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
    const user = await User.findById({ _id: decode._id });
    if(user.issuperAdmin)
    {
       const newcheckpoints = new Checkpoint(req.body);
       //now iscreated by detailes will be stored dynamically and only logged-in admin will be able to add checkpoints
       newcheckpoints.addedby=user
       try 
       {
          const savedCheckpoint = await newcheckpoints.save();
          res.json(savedCheckpoint);
       } catch (err) 
       {
        throw BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
       }
    }
    else
    {
      throw UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
    }
  });


//get all checkpoints
router.get("/", verifyy, async (req, res) => {
   try {
     const chkpoints = await Checkpoint.find();
     res.send(chkpoints);
   } catch (err) {
    throw BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
   }
 });


 //get particular checkpoints
 router.get("/:id", verifyy, async (req, res) => {
   const token =req.body.token || req.query.token || req.headers["auth-token"];
   const decode = jwt.verify(token,  config.JWT_TOKEN_SECRET);
   const user = await User.findById({ _id: decode._id });
   if(user.issuperAdmin)
   {

      try {
        const tobeupdated=await checkpoints.findById(req.params.id)
         if(tobeupdated.isdeleted)
         {
            res.send("Data you are looking for do not exists!")
         }
         else{

          const particular_checkpoint = await checkpoints.findById(req.params.id);
          res.send(particular_checkpoint);
         }
         
         
        
       } catch (err) {
        throw BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
       }
   }
   else{
    throw UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
   }
   
 });

//update checkpoint
router.put("/:id", verifyy, async (req, res) => {
   const token =req.body.token || req.query.token || req.headers["auth-token"];
     const decode = jwt.verify(token,  config.JWT_TOKEN_SECRET);
     const user = await User.findById({ _id: decode._id });
   if (user.issuperAdmin) {
     try {
         const tobeupdated=await checkpoints.findById(req.params.id)
         if(tobeupdated.isdeleted)
         {
            res.send("Data has been deleted, so you can not update")
         }
         else{

            const updatedMCheckpoint = await checkpoints.findByIdAndUpdate(
               req.params.id,
               {
                 $set: req.body,
               },
               { new: true }
             );
             res.status(200).json(updatedMCheckpoint );
         }
        
     } catch (err) {
       throw BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
     }
   } else {
    throw UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
   }
 });



//delete checkpoint
/*
when we call delete ,in real time we actually dont delete data but just updated the status 
is deleted true because in future we may need this data
as to show user that we have deleted data, if we will find chekcpoints.isdeleted==true, mean data is no more
*/
router.delete("/:id", verifyy, async (req, res) => {
   const token =req.body.token || req.query.token || req.headers["auth-token"];
     const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
     const user = await User.findById({ _id: decode._id });
   if (user.issuperAdmin) {
     try {
        const tobedeleted=await checkpoints.findById(req.params.id)
        if(tobedeleted.isdeleted)
        {
           res.send("Data has already been deleted")
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
          res.status(200).json("check-points has been deleted sucessfully");
        }
     
     } catch (err) {
       res.status(500).json(err);
     }
   } else {
    throw UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
   }
 });
module.exports = router;