/**
 I will create one route here which will call the cotroller from NodeJS-Distance-Matrix-wrapper
 overall work of this route will to give you distance between two locations
 You can also use this route for passing the array of locations but as for need we will limit this route to give
 distance between two locations


 */
 const router = require("express").Router();
 const Errors=require('../../toolbox/errors')
 const newDistances=require('../../wrappers/Nodejs-Distance-Matrix-Wrapper/index')

 const {
    BadRequest, STATUS_CODES
 } = Errors;
 
 
 router.get('/:start/:end',async (req,res)=>{
     try{
         const startloc=req.params.start;
         const endloc=req.params.end;
         
         const newvalue=newDistances(startloc,endloc)
        newvalue.then((val)=>{
            res.send(val)
        }).catch((err)=>{
            throw err;
        })
     }
     catch(err){

        throw new BadRequest('server error!',STATUS_CODES.INTERNAL_SERVER_ERROR)
     }
     
    
 })
 

 module.exports = router;
