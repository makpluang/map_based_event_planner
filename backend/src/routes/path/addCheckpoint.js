const {addCheckPoints,getAllCheckPoints,getCheckPointById,updateCheckpoint,deleteCheckPoint}=require('../../controller')
const handleAllError=require('../../toolbox/errorHandler/errorHandler')
const router = require("express").Router();
const verifyy = require("../../toolbox/helpers/verifyToken");

router.post("/add",verifyy,handleAllError(addCheckPoints));
router.get("/", verifyy,handleAllError(getAllCheckPoints));
router.get("/:id", verifyy, handleAllError(getCheckPointById));
router.put("/:id", verifyy, handleAllError(updateCheckpoint));
router.delete("/:id", verifyy,handleAllError(deleteCheckPoint));

module.exports = router;