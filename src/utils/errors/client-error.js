const AppError = require('./app-error');
class ClientError extends AppError {
    constructor(name, message, explaination, statusCode) {


        super(
            name,
            message,
            explaination,
            statusCode
        );

    }
}

module.exports = ClientError;