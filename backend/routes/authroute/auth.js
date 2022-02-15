const router = require("express").Router();
const User = require("../../models/Admin/admin");
const CryptoJS = require("crypto-js");
const Api404Error = require('../../error_handler/api404Error')

//REGISTER admin
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "apappapjjgdoehjdgjgshgfd"
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});
// router.post('/errort/:id',async(req,res)=>{

//   const {id}=req.params;
//   //const user1=await User.findById(id)
//   if(id=='1'){

//     throw new Api404Error(`User with id: ${id} not found.`)
//   }
//   else
//   {
//     res.send("done")
//   }
// })


module.exports = router;