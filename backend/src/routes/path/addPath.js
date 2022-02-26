const router = require('express').Router();
const veriffy = require('../../toolbox/helpers/verifyToken');
const {
  createNewPath, getAllCreatedPaths, getPathById, deleteParticularPath,
} = require('../../controller');
const handleAllError = require('../../toolbox/errorHandler/errorHandler');

router.post('/create/:points', veriffy, handleAllError(createNewPath));
router.get('/', veriffy, handleAllError(getAllCreatedPaths));
router.get('/:id', veriffy, handleAllError(getPathById));
router.delete('/:id', veriffy, handleAllError(deleteParticularPath));

module.exports = router;
