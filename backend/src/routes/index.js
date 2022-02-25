const authRoute = require('./auth/auth');
const checkpointsRoute = require('./path/addCheckpoint');
const pathsRoutes=require('./path/createdPaths')
const pathRoute=require('./path/addPath')
const adminInfo=require('./admin/adminInfo')
const distancematrix=require('./distance-matrix/distance')
const router = require("express").Router();

router.use('/admins', authRoute);
router.use('/checkpoints', checkpointsRoute);
router.use('/path',pathRoute)
router.use('/paths',pathsRoutes);
router.use('/admin',adminInfo);
router.use('/distance',distancematrix);

module.exports = router;