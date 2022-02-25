const router = require("express").Router();
const verifyy = require("../../toolbox/helpers/verifyToken");
const {getAdminById,updateAdminData,deleteAdmin}=require('../../controller')
const handleAllError=require('../../toolbox/errorHandler/errorHandler')


router.get("/:id",handleAllError(getAdminById))
router.put("/:id",verifyy, handleAllError(updateAdminData))
router.delete("/:id",verifyy,handleAllError(deleteAdmin))
  
module.exports = router;