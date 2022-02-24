const router = require("express").Router();
const User = require("../../toolbox/models/admin/admin");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Errors=require('../../toolbox/errors')
const {
  BadRequest,
  CustomError,
  STATUS_CODES,
  UnAuthenticatedError,
  UnAuthorisedError
} = Errors;



const config=require('../../config')

//register admin
/*for now all admin are getting registered as super admin but in future this route will be changed as 
there will be one super admin and he can make some of the user as an admin
 */
router.post("/register", async (req, res,next) => {
 
  try {
        const  {name,email,password}=req.body
        if(!name|| !email || !password){

          throw new CustomError("Please Enter all the required filed!!",STATUS_CODES.BAD_REQUEST)
        }else{

          const newUser = new User({
            name: name,
            email: email,
            password: CryptoJS.AES.encrypt(
              password,
              config.JWT_TOKEN_SECRET
            ).toString(),
          });
          const user = await newUser.save();
          res.json(user);
        }
      
  } catch (err) 
  {
    return next(err)

  }
});

//login admin
router.post("/login", async (req, res,next) => {
  try {
      const user = await User.findOne({ email: req.body.email });
      if(!user)
      {
        throw new CustomError("User with given Info do not Exists",STATUS_CODES.NOT_FOUND)
      }
      else
      {
        const bytes = CryptoJS.AES.decrypt(user.password,  config.JWT_TOKEN_SECRET);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if(originalPassword !== req.body.password)
        {
          throw new CustomError("Wrong Password!",STATUS_CODES.NOT_FOUND)
        } 
        else
        {
          const token = jwt.sign({ _id: user._id}, config.JWT_TOKEN_SECRET);
          res.header("auth-token",token).send(token).toString();
        }
      }
  } catch (error) {
    return next(error);;
}
});

module.exports = router;