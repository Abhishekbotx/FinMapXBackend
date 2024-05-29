const { StatusCodes } = require('http-status-codes')
const { AdminResetPasswordService } = require('../services/index')
const { CustomerCheckIn } = require('../models/index')
const resetPasswordService = new AdminResetPasswordService()

const customerCheckIn = async (req, res) => {
    try {
        const {name,email,message}=req.body
        const checkIn=CustomerCheckIn.create({name,email,message})
        return res.json({
            data: checkIn,
            message: "checkIn created successfully"
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Internal Server Error',
            success: false,
            error: error.explanation || 'Unknown error occurred',
            data: {}
        });
    }
}

module.exports={customerCheckIn}