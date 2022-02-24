const jwt = require("jsonwebtoken");
const Errors=require('../errors');
const config=require('../../config')
const {
   UnAuthorisedError, STATUS_CODES
} = Errors;

 module.exports=function(req,res,next){
    const token=req.header("auth-token");
    if(!token){

      throw new UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
    }
   try{
       const verified=jwt.verify(token,config.JWT_TOKEN_SECRET);
       req.user=verified;
       next();
    }
    catch(error){
      
       next(err)
    }
 }
