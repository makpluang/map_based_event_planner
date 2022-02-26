const StatusCodes = require('./StatusCodes');
const CustomError = require('./CustomError');

class UnAuthenticatedError extends CustomError {
  constructor(message, statusCode = StatusCodes.UNAUTHENTICATED_REQUEST, meta = {}) {
    super(message, statusCode, meta);
    Error.captureStackTrace(this, UnAuthenticatedError);
    const proto = Object.getPrototypeOf(this);
    proto.name = meta.name || 'UnAuthenticated Request';
  }
}

module.exports = UnAuthenticatedError;
