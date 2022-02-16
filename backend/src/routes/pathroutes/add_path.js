const router = require("express").Router();
const Checkpoints=require('../../toolbox/models/CheckPoints/checkpoints')
const Path=require('../../toolbox/models/Path/path')
const User=require('../../toolbox/models/Admin/admin')
const veriffy=require('../../toolbox/helpers/verifyToken')
const jwt = require("jsonwebtoken");
const Errors=require('../../toolbox/errors')
const {
  UnAuthorisedError, BadRequest, STATUS_CODES
} = Errors;



//create a path by selecting some check points
//number of check points to added will be passed as a prams
//this path can be seen by admin,user dont know about this database
//purpose of this model is to give flexibilty to admin adding multiple path to this database without disturbing exposed paths
//and when in future he needed, can expose this path for user purpose

router.post("/create/:points",veriffy,async(req,res)=>{
  
  try{

    const token =req.body.token || req.query.token || req.headers["auth-token"];
    const decode = jwt.verify(token, "thisismysecret");
    const user = await User.findById({ _id: decode._id });
    if(user.issuperAdmin)
    {
          const checkpoints=await Checkpoints.find();
          if(checkpoints.length==0)
          {

            res.send("There is no checkpoints, so you will not be able to create path")
          }
          else
          {

            const {points}=req.params;
            var selected_checkpoints;
            if(checkpoints.length>=points)
            {

              selected_checkpoints=checkpoints.slice(0,points);
            }
            else
            {
              selected_checkpoints=checkpoints.slice(0,checkpoints.length);
            }
            const path = new Path();
            path.route = selected_checkpoints
            await path.save();
            res.send(`Path created with ${selected_checkpoints.length} checkpoints ,successfully`);
        }
      }
    else
    {
        //res.send("You are not a super Admin")
        throw new UnAuthorisedError("Not an Admin !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
    }
  }
  catch(err){
    throw new BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
  }

  });

  /*
  
    get all the paths which are created by the administrator
    remember this path yet has not been exposed for user purposes
    to see the exposed route please visite paths route 
  */
  router.get('/',async(req,res)=>{
    
    try{

      const token =req.body.token || req.query.token || req.headers["auth-token"];
      const decode = jwt.verify(token, "thisismysecret");
      const user = await User.findById({ _id: decode._id });
      if(user.issuperAdmin){

        const getpath=await Path.find();
        res.send(getpath)
      }
      else{

        throw new UnAuthorisedError("Not an Admin !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
      }
      
       
    }
    catch(err)
    {
      throw new BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
    
  })


//get path by id
router.get("/:id", veriffy, async (req, res) => {
  const token =req.body.token || req.query.token || req.headers["auth-token"];
    const decode = jwt.verify(token,  "thisismysecret");
    const user = await User.findById({ _id: decode._id });
  if (user.issuperAdmin) {
    try {
       const pathexist=await Path.findById(req.params.id)
       if(pathexist.isdeleted)
       {
          res.send("Path no more exists in the database")
       }
       else
       {

        return res.send(pathexist)
        
       }
    
    } catch (err) {
      throw new BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
  } else {
   throw new UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
  }
});


/*
when we call delete ,in real time we actually dont delete data but just updated the status 
is deleted true because in future we may need this data
as to show user that we have deleted data, if we will find path.isdeleted==true, mean data is no more
*/
  router.delete("/:id", veriffy, async (req, res) => {
    const token =req.body.token || req.query.token || req.headers["auth-token"];
      const decode = jwt.verify(token,  "thisismysecret");
      const user = await User.findById({ _id: decode._id });
    if (user.issuperAdmin) {
      try {
         const tobedeleted=await Path.findById(req.params.id)
         if(tobedeleted.isdeleted)
         {
            res.send("Path has already been deleted")
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
        throw new BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
      }
    } else {
     throw new UnAuthorisedError("Unauthorized user !",STATUS_CODES.UNAUTHENTICATED_REQUEST)
    }
  });
module.exports = router;