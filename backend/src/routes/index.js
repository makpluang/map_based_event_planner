const authRoute = require('./authroute/auth');
const checkpointsRoute = require('./pathroutes/add_checkpoints');
const pathsroutes=require('./pathroutes/all_paths')
const pathroute=require('./pathroutes/add_path')
const adminInfo=require('./AdminInforoute/adminInfo')
const distancematrix=require('./distance-matrix/distance')
const router = require("express").Router();

router.use('/api/admins', authRoute);//adding admins
router.use('/api/checkpoints', checkpointsRoute);//this route is reponsible for adding the new check points 
router.use('/api/path',pathroute)//this is total path created
router.use('/api/paths',pathsroutes);//this is path exposed for assigning to the coming user
//startegy to assign path is selecting random path from api/paths and assign to the map end point
//along with start and end point
router.use('/api/admin',adminInfo);
//here we will cal distance matrix route
router.use('/api/distance',distancematrix);

module.exports = router;