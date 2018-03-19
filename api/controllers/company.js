let Company = require('../models/company')

let config = require('../../config/config')
let errObj = require('../utils/parseErrors')
class CompanyController {
    async  getListOfUnverifiedCompanies(req, res, next) {
        try {
            let unverifiedCompanies = await Company
                .find({ confirmed: false })
                .populate({
                    path: 'owner',
                    model: 'User',
                    select: 'nickname email -_id'
                })
                .populate({
                    path: 'workers',
                    model: 'User',
                    select: 'nickname -_id'
                })
                .exec()
            res.status(200).json(unverifiedCompanies);
        } catch (error) {
            console.log(error)
            next(errObj.createError('no such companies', 400))
        }
    }
    async  createCompany(req, res, next) {
        let data = req.body;
        try {
            data.owner = req.user.id
            let company = await Company.create(data)

            res.status(200).json(company)
        } catch (error) {
            console.log(error);
            next(errObj.createError('can`t create company', 400))
        }
    }
    async submitCompany() {



    }
    async rejectCompany() {



    }


}

module.exports = CompanyController;