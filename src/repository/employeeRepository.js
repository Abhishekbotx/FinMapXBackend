const {Employee,EmployeeProfile,CustomerProfile} = require('../models/index');
const { ClientError,ValidationError,AppError } = require('../utils/errors/index');
const { StatusCodes } = require('http-status-codes');


class UserRepository {
    async addCustomerData(data){
        try {
            const customer=await CustomerProfile.create(data)
            return customer
        } catch (error) {
            console.log("Something went wrong on the repository layer");
            throw new AppError(
                'addingCustomerError',
                'Error occurred while adding customer',
                error.message,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
    async createUser(userData) {
        try {
            const profileDetails = await EmployeeProfile.create({
                gender: null,
                dateOfBirth: null,
                about: null,
                contactNumber: null,
              })
            const user = await Employee.create({...userData,additonalDetails:profileDetails._id})
            return user;
        } catch (error) {
            console.log("Something went wrong on the repository layer");
            throw new AppError(
                'CreateUserError',
                'Error occurred while creating user',
                error.message,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }



    async delete(userId) {
        try {
           const response=await Employee.findByIdAndDelete(userId);
           return response
        } catch (error) {
            console.error("Error occurred while deleting user in repository layer:", error);
            throw new AppError(
                'DeleteUserError',
                'Error occurred while deleting user',
                error.message,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
    async deleteUserByEmail(email) {
        try {
           const response= await Employee.findOneAndDelete({email:email});
           return response
        } catch (error) {
            console.error("Error occurred while deleting user in repository layer:", error);
            throw new AppError(
                'DeleteUserError',
                'Error occurred while deleting user',
                error.message,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllEmployeeTypeEmployeees() {
        try {
            const user = await Employee.find({accountType:'Employee'});
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async getAllUserTypeEmployeees() {
        try {
            const user = await Employee.find({accountType:'User'});
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async getActiveEmployees() {
        try {
            const user = await Employee.find({accountType:'Employee',active:'active'});
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async getInactiveEmployees() {
        try {
            const user = await Employee.find({accountType:'Employee',active:'inActive'});
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await Employee.findOne({ email: email });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }


    async getUserById(userId) {
        try {
            console.log('userId in repolayer',userId)
            const user = await Employee.findById(userId)
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getUserByToken(token) {
        try {
            const user = await Employee.findOne({ token: token });
            return user;
        } catch (error) {
            console.log("Something went wrong while finding user on repository layer");
            throw error;
        }
    }

    async updateToken(data) {
        try {
            const user = await Employee.findOneAndUpdate(
                { email: data.email },
                { $set: { token: data.token } },
                { new: true }
            );
            if (!user) {
                throw new AppError(
                    'UserNotFoundError',
                    'User not found',
                    `User with email ${data.email} not found`,
                    StatusCodes.NOT_FOUND
                );
            }

            return user;
        } catch (error) {
            console.error("Error occurred while updating user in repository layer:", error);
            throw new AppError(
                'UpdateUserError',
                'Error occurred while updating user',
                error.message,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }


   
    


}

module.exports = UserRepository;
