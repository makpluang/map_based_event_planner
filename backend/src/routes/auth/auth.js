const router = require("express").Router();
const {register,login}=require('../../controller')
const handleAllError=require('../../toolbox/errorHandler/errorHandler')


router.post("/register",handleAllError(register) )
router.post("/login",handleAllError(login));

module.exports = router;