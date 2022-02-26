/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../../toolbox/models/admin/admin');
const Errors = require('../../toolbox/errors');
const config = require('../../config');

const {

  CustomError,
  STATUS_CODES,
  UnAuthorisedError,
} = Errors;

const getAdminById = async (req, res) => {
  const userInfo = await User.findById(req.params.id);
  const isExist = await User.findById(req.params.id);
  if (!userInfo || isExist.isdeleted) {
    throw new CustomError('Data you are looking for do not exists!!', STATUS_CODES.UNAUTHENTICATED_REQUEST);
  } else {
    res.send(userInfo);
  }
};

const updateAdminData = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['auth-token'];
  const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
  const user = await User.findById({ _id: decode._id });
  if (user.issuperAdmin) {
    const isExist = await User.findById(req.params.id);
    if (isExist.isdeleted) {
      throw new CustomError('Admin has been deleted, so you can not update!', STATUS_CODES.UNAUTHENTICATED_REQUEST);
    } else {
      const updatedAdmin = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );
      res.send(updatedAdmin);
    }
  } else {
    throw new UnAuthorisedError('Unauthorized user !', STATUS_CODES.UNAUTHENTICATED_REQUEST);
  }
};

const deleteAdmin = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['auth-token'];
  const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
  const user = await User.findById({ _id: decode._id });
  if (user.issuperAdmin) {
    const tobedeleted = await User.findById(req.params.id);
    if (tobedeleted.isdeleted) {
      throw new CustomError('Data you are looking for do not exists!!!', STATUS_CODES.UNAUTHENTICATED_REQUEST);
    } else {
      const deletedAdmin = await User.findByIdAndUpdate(
        req.params.id,
        {
          isdeleted: true,
        },
        { new: true },
      );
      console.log(deletedAdmin);
      res.send('Data has been deleted sucessfully');
    }
  } else {
    throw new UnAuthorisedError('Unauthorized user !', STATUS_CODES.UNAUTHENTICATED_REQUEST);
  }
};

module.exports = { getAdminById, updateAdminData, deleteAdmin };
