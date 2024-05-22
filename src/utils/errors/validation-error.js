const { StatusCodes } = require('http-status-codes');

class ValidationError extends Error {
    constructor(errors) {
        super();
        let explanation = [];
        Object.keys(errors).forEach((item)=>{
            // console.log(item)
            explanation.push(`${item} is required`)
        }) 
        this.name = 'ValidationError';
        this.message = 'Not able to validate the data sent in the request';
        this.explanation = explanation;
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = ValidationError;