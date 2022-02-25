 const router = require("express").Router();
 const {getPairOfDistances,getArrayOfDistances}=require('../../controller')
 const handleAllError=require('../../toolbox/errorHandler/errorHandler')

 router.get('/:start/:end',handleAllError(getPairOfDistances));
 router.get('/multi/(:arr)*',handleAllError(getArrayOfDistances));

 module.exports=router