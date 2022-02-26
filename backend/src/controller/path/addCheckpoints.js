/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../../toolbox/models/admin/admin');
const Checkpoint = require('../../toolbox/models/checkPoints/checkpoints');
const checkpoints = require('../../toolbox/models/checkPoints/checkpoints');
const Errors = require('../../toolbox/errors');
const config = require('../../config');

const {
  CustomError,
  STATUS_CODES,
  UnAuthorisedError,
} = Errors;

const addCheckPoints = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['auth-token'];
  const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
  const user = await User.findById({ _id: decode._id });
  if (user.issuperAdmin) {
    const {
      lattitude, longitude, title, about, rating,
    } = req.body;
    if (!lattitude || !longitude || !title || !about || !rating) {
      throw new CustomError('Please add all the required field! !', STATUS_CODES.NOT_FOUND);
    } else {
      const newCheckpoints = new Checkpoint(req.body);
      newCheckpoints.addedby = user;
      const savedCheckpoint = await newCheckpoints.save();
      res.json(savedCheckpoint);
    }
  } else {
    throw new UnAuthorisedError('Unauthorized user !', STATUS_CODES.UNAUTHENTICATED_REQUEST);
  }
};
const getAllCheckPoints = async (req, res) => {
  const allCheckPoints = await Checkpoint.find();
  if (!allCheckPoints) {
    throw new CustomError('Data you are looking for do not exists!!', STATUS_CODES.UNAUTHENTICATED_REQUEST);
  } else {
    res.send(allCheckPoints);
  }
};

const getCheckPointById = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['auth-token'];
  const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
  const user = await User.findById({ _id: decode._id });
  if (user.issuperAdmin) {
    const toBeSendToClient = await checkpoints.findById(req.params.id);
    if (toBeSendToClient.isdeleted || !toBeSendToClient) {
      throw new CustomError('Data you are looking for do not exists! !', STATUS_CODES.NOT_FOUND);
    } else {
      const particularCheckpoint = await checkpoints.findById(req.params.id);
      res.json(particularCheckpoint);
    }
  } else {
    throw new UnAuthorisedError('Unauthorized user !', STATUS_CODES.UNAUTHENTICATED_REQUEST);
  }
};

const updateCheckpoint = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['auth-token'];
  const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
  const user = await User.findById({ _id: decode._id });
  if (user.issuperAdmin) {
    const toBeUpdated = await checkpoints.findById(req.params.id);
    if (toBeUpdated.isdeleted) {
      throw new CustomError('Data has been deleted, so you can not update !', STATUS_CODES.NOT_FOUND);
    } else {
      const updatedMCheckpoint = await checkpoints.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );
      res.json(updatedMCheckpoint);
    }
  } else {
    throw UnAuthorisedError('Unauthorized user !', STATUS_CODES.UNAUTHENTICATED_REQUEST);
  }
};

const deleteCheckPoint = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['auth-token'];
  const decode = jwt.verify(token, config.JWT_TOKEN_SECRET);
  const user = await User.findById({ _id: decode._id });
  if (user.issuperAdmin) {
    const toBeDeleted = await checkpoints.findById(req.params.id);
    if (toBeDeleted.isdeleted) {
      throw new CustomError('Data has already been deleted!', STATUS_CODES.NOT_FOUND);
    } else {
      const deletedCheckpoints = await checkpoints.findByIdAndUpdate(
        req.params.id,
        {
          isdeleted: true,
        },
        { new: true },
      );
      res.send(deletedCheckpoints);
    }
  } else {
    throw new UnAuthorisedError('Unauthorized user !', STATUS_CODES.UNAUTHENTICATED_REQUEST);
  }
};

module.exports = {
  addCheckPoints, getAllCheckPoints, getCheckPointById, updateCheckpoint, deleteCheckPoint,
};
