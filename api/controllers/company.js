let Company = require('../models/company')

let config = require('../../config/config')
let errObj = require('../utils/parseErrors')

async function getListOfUnverifiedCompanies() {
    try {
        let unverifiedCompanies = await Company
            .find({ confirmed: false })
            .populate({
                path: 'owner',
                model: 'User',
                select: 'firstname lastname email '
            })
            .exec()
        res.status(200).json(unverifiedCompanies);
    } catch (error) {
        next(errObj.createError('no such companies',400))
        res.status(400).json(error)
    }
}
async function createCompany(company){
    try {
        let company =   Company.create({companyName:company})
        res.status(200).json(company)
    } catch (error) {
        next(errObj.createError('can`t create company',400))
    }
}
function submitCompany() {
    


}
function rejectCompany() {



}
module.exports = {
    getListOfUnverifiedCompanies: getListOfUnverifiedCompanies
}