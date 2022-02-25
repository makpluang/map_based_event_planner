const router = require("express").Router();
const veriffy=require('../../toolbox/helpers/verifyToken')
const  {exposedPathTouser,getAllExposedPath,assingRandomPathToUser}=require('../../controller')
const handleAllError=require('../../toolbox/errorHandler/errorHandler')


router.post("/add/:rout",veriffy,handleAllError(exposedPathTouser));
router.get('/',veriffy,handleAllError(getAllExposedPath));
router.get('/pathtofollow/:start/:end',handleAllError(assingRandomPathToUser));

  

module.exports = router;