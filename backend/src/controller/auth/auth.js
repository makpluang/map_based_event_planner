const User = require("../../toolbox/models/admin/admin");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Errors=require('../../toolbox/errors')
const {
  
  CustomError,
  STATUS_CODES
} = Errors;
const config=require('../../config')

const register=async (req,res)=>{

    const  {name,email,password}=req.body
    if(!name|| !email || !password)
    {
        throw new CustomError("Please Enter all the required filed!!",STATUS_CODES.BAD_REQUEST)
    }
    else
    {
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
}


const login=async (req,res)=>{

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
}



module.exports = {register,login}