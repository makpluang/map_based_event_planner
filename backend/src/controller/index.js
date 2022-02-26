const { register, login } = require('./auth/auth');
const { getAdminById, updateAdminData, deleteAdmin } = require('./admin/adminInfo');
const { getPairOfDistances, getArrayOfDistances } = require('./distanceMatrix/distanceMatrix');
const {
  addCheckPoints, getAllCheckPoints, getCheckPointById, updateCheckpoint, deleteCheckPoint,
} = require('./path/addCheckpoints');
const {
  createNewPath, getAllCreatedPaths, getPathById, deleteParticularPath,
} = require('./path/addPath');
const { exposedPathTouser, getAllExposedPath, assingRandomPathToUser } = require('./path/createdPaths');

const controllers = {
  register,
  login,
  getAdminById,
  updateAdminData,
  deleteAdmin,
  getPairOfDistances,
  getArrayOfDistances,
  addCheckPoints,
  getAllCheckPoints,
  getCheckPointById,
  updateCheckpoint,
  deleteCheckPoint,
  createNewPath,
  getAllCreatedPaths,
  getPathById,
  deleteParticularPath,
  exposedPathTouser,
  getAllExposedPath,
  assingRandomPathToUser,

};

module.exports = { ...controllers };
