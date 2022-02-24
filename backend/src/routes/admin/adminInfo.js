const router = require("express").Router();
const User=require('../../toolbox/models/admin/admin')
const verifyy = require("../../toolbox/helpers/verifyToken");
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




//get admin data

/*
I am not checking authorization for get admin details route as 
my end point random path is having an object id of admin
and to show who added checkpoint,I anyway want details of admin who has added the checkpoint
so without making it complex ,I ma returning the details
*/
 router.get("/:id",async (req, res,next) => {
   
      try {
          const userInfo=await User.findById(req.params.id)
          const isExist=await User.findById(req.params.id)
          if(!userInfo || isExist.isdeleted)
          {
              throw new CustomError('Data you are looking for do not exists!!',STATUS_CODES.UNAUTHENTICATED_REQUEST)
          }
          else{
              res.send(userInfo);
          }
      } catch (err) {
          return next(err)
       }
   
   
 });

//update admin
router.put("/:id", verifyy, async (req, res,next) => {
  try{

    const token =req.body.token || req.query.token || req.headers["auth-token"];
    const decode = jwt.verify(token,  config.JWT_TOKEN_SECRET);
    const user = await User.findById({ _id: decode._id });
    if (user.issuperAdmin) {
        try {
            
          const isExist=await User.findById(req.params.id)
          if(isExist.isdeleted)
          {
      
              throw new CustomError('Admin has been deleted, so you can not update!',STATUS_CODES.UNAUTHENTICATED_REQUEST)
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
  }
  catch(err){
    return next(err)
  }
  
 });



//delete  admin
/*
when we call delete ,in real time we actually dont delete data but just updated the status 
is deleted true because in future we may need this data
as to show user that we have deleted data, if we will find user.isdeleted==true, mean data is no more
*/
router.delete("/:id", verifyy, async (req, res,next) => {
  try{

      const token =req.body.token || req.query.token || req.headers["auth-token"];
      const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
      const user = await User.findById({ _id: decode._id });
    if (user.issuperAdmin) {
      try {
          const tobedeleted=await User.findById(req.params.id)
          if(tobedeleted.isdeleted)
          {
            
            throw new CustomError("Data you are looking for do not exists!!!",STATUS_CODES.UNAUTHENTICATED_REQUEST)
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
            res.send('Data has been deleted ')
            
          }
      
      } catch (err) {
          throw new BadRequest('Looks like ,Data is no more in the database !',STATUS_CODES.INTERNAL_SERVER_ERROR)
      }
    } else {
      throw new UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
    }
  }catch(err){
    return next(err)
  }
   
 });
module.exports = router;