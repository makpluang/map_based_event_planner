const jwt = require('jsonwebtoken');
const Errors = require('../errors');
const config = require('../../config');

const {
  UnAuthorisedError, STATUS_CODES,
} = Errors;

// eslint-disable-next-line func-names
module.exports = async function (req, res, next) {
  try {
    const token = req.header('auth-token');
    if (!token) {
      throw new UnAuthorisedError('Unauthorized user !', STATUS_CODES.UNAUTHENTICATED_REQUEST);
    }
    const verified = jwt.verify(token, config.JWT_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    next(error);
  }
};
