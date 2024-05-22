const {  EmployeeProfile } = require('../models/index');
const { AppError } = require('../utils/errors/index');
const { StatusCodes } = require('http-status-codes');

class ProfileRepository {
    async findProfileById(id) {
        try {
            console.log(id)
            const profileDetails = await EmployeeProfile.findById(id);
            if (!profileDetails) {
                throw new AppError(
                    'ProfileUpdateError',
                    'Error while fetching profile details',
                    'Something went wrong while profile updation',
                    StatusCodes.EXPECTATION_FAILED
                );
            }
            return profileDetails;
        } catch (error) {
            console.error('Error in profile repository:', error);
            throw error
        }
    }
}

module.exports = ProfileRepository;
