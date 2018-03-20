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
            next(error)
        }
    }
    async  createCompany(req, res, next) {
        let data = req.body;
        try {
            data.owner = req.user.id
            let company = await Company.create(data)
            res.status(200).json(company)
        } catch (error) {
            next(error)
        }
    }
    //TODO: submit list of companies
    async updateCompany(req, res, next) {
        try {
            //   let compArray = req.body.companyNames.;
            let criteria = {
                companyName: { $in: req.body.companyNames}
            }
            let approvedCompanies = await Company.update(
                criteria,
                { $set: { confirmed: true } },
                { multi: true }
            )
            res.status(200).json(approvedCompanies)
        } catch (error) {
            next(error)
        }
    }
    async submitCompany() {



    }

    async rejectCompany() {



    }


}

module.exports = CompanyController;