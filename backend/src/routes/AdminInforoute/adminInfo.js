const router = require("express").Router();
const User=require('../../toolbox/models/Admin/admin')
const verifyy = require("../../toolbox/helpers/verifyToken");
const jwt = require("jsonwebtoken");
const Errors=require('../../toolbox/errors')
const config=require('../../config')
const {
  UnAuthorisedError, BadRequest, STATUS_CODES
} = Errors;




//get admin data

/*
I am not checking authorization for get admin details route as 
my end point random path is having an object id of admin
and to show who added checkpoint,I anyway want details of admin who has added the checkpoint
so without making it complex ,I ma returning the details
*/
 router.get("/:id",async (req, res) => {
   
      try {
        const userInfo=await User.findById(req.params.id)
        const isExist=await User.findById(req.params.id)
         if(!userInfo || isExist.isdeleted)
         {
            res.send("Data you are looking for do not exists!")
         }
         else{

          
          res.send(userInfo);
         }
         
         
        
       } catch (err) {
        throw new BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
       }
   
   
 });

//update admin
router.put("/:id", verifyy, async (req, res) => {
   const token =req.body.token || req.query.token || req.headers["auth-token"];
     const decode = jwt.verify(token,  config.JWT_TOKEN_SECRET);
     const user = await User.findById({ _id: decode._id });
   if (user.issuperAdmin) {
     try {
         
        const isExist=await User.findById(req.params.id)
        if(isExist.isdeleted)
        {
           res.send("Admin has been deleted, so you can not update")
        }
        else
        {

            const updatedAdmin = await User.findByIdAndUpdate(
                req.params.id,
                {
                  $set: req.body,
                },
                { new: true }
              );
              res.send(updatedAdmin );

        }

         
        
     } catch (err) {
       throw new BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
     }
   } else {
    throw new UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
   }
 });



//delete  admin
/*
when we call delete ,in real time we actually dont delete data but just updated the status 
is deleted true because in future we may need this data
as to show user that we have deleted data, if we will find user.isdeleted==true, mean data is no more
*/
router.delete("/:id", verifyy, async (req, res) => {
   const token =req.body.token || req.query.token || req.headers["auth-token"];
     const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
     const user = await User.findById({ _id: decode._id });
   if (user.issuperAdmin) {
     try {
        const tobedeleted=await User.findById(req.params.id)
        if(tobedeleted.isdeleted)
        {
           res.send("Admin is no more in the database")
        }
        else
        {

         const deletedAdmin= await User.findByIdAndUpdate(
            req.params.id,
            {
              isdeleted: true,
            },
            { new: true }
          );
          res.send("Admin has been deleted sucessfully");
        }
     
     } catch (err) {
        throw new BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
     }
   } else {
    throw new UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
   }
 });
module.exports = router;