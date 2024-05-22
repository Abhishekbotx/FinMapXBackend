const {Admin} = require('../models/index');
const { ClientError,ValidationError } = require('../utils/errors/index');
const { StatusCodes } = require('http-status-codes');

class AdminAuthRepository {
    async createSubAdmin(userData) {
        try {
            const user = await Admin.create(userData);
            console.log('user:',user)
            return user;
        } catch (error) {
            
            console.log("Something went wrong on the repository layer",error);

            throw error;
        }
    }
    async getAdminByEmail(email) {
        try {
            const user = await Admin.findOne({email:email});
            // console.log('user:',user)
            return user;
        } catch (error) {
            // if (error.name === 'ValidationError') {
            //     'error in finding admin'
            // } 
            console.log("Something went wrong on the repository layer");
            console.log("error name:", error.name);
            throw error;
        }
    }
    async getAdminByToken(token) {
        try {
            console.log('token in repo',token)
            const admin = await Admin.findOne({token:token});
            console.log('Admin info in repository:',admin)
            // if (admin && admin.image) {
            //     const initialPath = 'C:\\Users\\abhis\\Desktop\\FinMap\\src\\services';
            //     const replacedPath = admin.image.replace(initialPath, '');
            
            //     console.log('Replaced image destination:', replacedPath);
            // }
            admin.password='dummypassword'
            return admin;
        } catch (error) {
            // if (error.name === 'ValidationError') {
            //     'error in finding admin'
            // } 
            console.log("Something went wrong on the repository layer");
            console.log("error name:", error.name);
            throw error;
        }
    }
    async getAdminById(userId) {
        try {
            const user = await Admin.findById(userId);
            console.log('user:',user)
            return user;
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new ValidationError(error.errors);
            } 
            console.log("Something went wrong on the repository layer");
            console.log("error name:", error.name);
            throw error;
        }
    }
    
    async deleteSubAdmin(userId) {
        try {
            return await Admin.findByIdAndDelete(userId);
        } catch (error) {
            console.error("Error occurred while deleting user in repository layer:", error);
            throw new AppError(
                'DeleteSubAdminError',
                'Error occurred while deleting user',
                error.message,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
    async getAllAdmins() { 
        try {
             const response= await Admin.find();
             return response
        } catch (error) {
            console.error("Error occurred while fetching subadmins in repository layer:", error);
            throw new AppError(
                'FetchSubAdmins Error',
                'Error occurred while deleting user',
                error.message,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    


    async update(data) {
        try {
            const user = await User.findOneAndUpdate(
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


    async findByToken(token) {
        try {
            const user = await Admin.findOne({token:token});
            if (!user) {
                throw new ClientError(
                    'UserNotFoundError',
                    'User not found',
                    'No user found with the provided ID',
                    StatusCodes.NOT_FOUND
                );
            }
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    

    async isAdmin(userEmail) {
        try {
            const user = await this.getUserByEmail(userEmail);
            
            return user.role === 'admin'; 
        } catch (error) {
            throw new ClientError(
                'AdminCheckError',
                'Error occurred while checking admin status',
                error.message,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    

    async addEmployee(data) {
        try {
            const user = await User.find({email:data.userEmail});
            const adder = await User.find({email:data.adderEmail});
            const isAdmin=adder.accounType="Admin"
            
            // const isAdmin = true; 

            if (!isAdmin) {
                throw new ClientError(
                    'AddEmployeeError',
                    'The user attempting to add an employee is not an admin.',
                    'User must have admin privileges to add an employee.',
                    StatusCodes.FORBIDDEN
                );
            }

            
            user.role = 'Employee';
            await user.save();

            return user;
        } catch (error) {
            console.error("Error occurred while adding an employee in repository layer:", error);
            throw error;
        }
    }

    async deleteEmployeeStatus(data) {
        try {
            const user = await User.find({email:data.userEmail});
            const adder = await User.find({email:data.adderEmail});
            const isAdmin=adder.accounType="Admin"


            if (!isAdmin) {
                throw new ClientError(
                    'AddEmployeeError',
                    'The user attempting to add an employee is not an admin.',
                    'User must have admin privileges to add an employee.',
                    StatusCodes.FORBIDDEN
                );
            }

            
            user.role = 'User';
            await user.save();

            return user;
        } catch (error) {
            console.error("Error occurred while deleting employee in repository layer:", error);
            throw error;
        }
    }
}

module.exports = AdminAuthRepository;
