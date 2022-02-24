const authRoute = require('./auth/auth');
const checkpointsRoute = require('./path/addCheckpoint');
const pathsRoutes=require('./path/createdPaths')
const pathRoute=require('./path/addPath')
const adminInfo=require('./admin/adminInfo')
const distancematrix=require('./distance-matrix/distance')
const router = require("express").Router();

router.use('/admins', authRoute);//adding admins
router.use('/checkpoints', checkpointsRoute);//this route is reponsible for adding the new check points 
router.use('/path',pathRoute)//this is total path created
router.use('/paths',pathsRoutes);//this is path exposed for assigning to the coming user
//startegy to assign path is selecting random path from api/paths and assign to the map end point
//along with start and end point
router.use('/admin',adminInfo);
router.use('/distance',distancematrix);

module.exports = router;