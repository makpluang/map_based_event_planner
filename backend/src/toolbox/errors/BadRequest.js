const StatusCodes = require('./StatusCodes');
const CustomError = require('./CustomError');

class BadRequest extends CustomError {
    constructor(message, statusCode = StatusCodes.BAD_REQUEST, meta = {}) {
        super(message, statusCode, meta);
        Error.captureStackTrace(this, BadRequest);
        const proto = Object.getPrototypeOf(this);
        proto.name = meta.name || 'BadRequest';
    }
}

module.exports = BadRequest;
