const router = require("express").Router();
const User = require("../../toolbox/models/Admin/admin");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {BadRequest, STATUS_CODES}=require('../../toolbox/errors')

//register admin
/*for now all admin are getting registered as super admin but in future this route will be changed as 
there will be one super admin and he can make some of the user as an admin
 */
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "thisismysecret"
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    throw BadRequest('server error !',STATUS_CODES.INTERNAL_SERVER_ERROR)
  }
});

//login admin
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user)
    {
      res.send("User with given information do not exists!")
    }
    const bytes = CryptoJS.AES.decrypt(user.password, "thisismysecret");
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if(originalPassword !== req.body.password){

      res.send("wrong password")
    } 
      

    const token = jwt.sign({ _id: user._id},"thisismysecret");

    
    res.header("auth-token",token).send(token).toString();
  } catch (err) {
    throw new BadRequest('server error.',STATUS_CODES.INTERNAL_SERVER_ERROR)
  }
});

module.exports = router;