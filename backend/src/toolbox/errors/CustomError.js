class CustomError extends Error {
    constructor(message, statusCode, meta = {}) {
        super(message);
        this.meta = meta;
        this.statusCode = statusCode;
    }

    toString() {
        return `${super.toString()} ${JSON.stringify(this.meta)}`;
    }

    getErrorObject() {
        return {
            code: this.meta.code || this.statusCode,
            error_message: this.meta.message || this.message,
        };
    }
}

module.exports = CustomError;
