const {  CustomerProfile } = require("../models/index");
const mongoose = require('mongoose');
const AppError = require("../utils/errors/app-error");
const {StatusCodes}=require('http-status-codes')
class CustomerRepository {
 async findCustomerByEmail(email){
    try {
        return await CustomerProfile.findOne({email:email})
        
    } catch (error) {
        throw error
    }
 }
 async findCustomerById(id){
    try {
        return await CustomerProfile.findOne({_id:id})
        
    } catch (error) {
        throw error
    }
 }
 async getAllCustomers(){
    try {
        return await CustomerProfile.find()
        
    } catch (error) {
        throw error
    }
 }
 async getAllCustomersByEmployeeId(id){
    try {
        return await CustomerProfile.find({adderId:id})
        
    } catch (error) {
        throw error
    }
 }
 async getCustomerById(id){
    try {
        return await CustomerProfile.findOne({_id:id})
        
    } catch (error) {
        throw error
    }
 }
}

module.exports=CustomerRepository 