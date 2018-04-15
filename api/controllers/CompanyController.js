const Company = require('../models/company')
const Team = require('../models/team')
const BaseController = require('./BaseController');
const config = require('../../config/config')
let errObj = require('../utils/parseErrors')
class CompanyController extends BaseController {
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
            super.responseJSON(res, 200, true, unverifiedCompanies)
        } catch (error) {
            next(error)
        }
    }
    async getCompany(req, res, next) {
        try {
            let company = await Company.findOne({ owner: req.user },
                '-workers -confirmed')
                .populate({
                    path: 'listOfTeams',
                    populate: {
                        path: 'teamlead manager members',
                        select:'email',
                        model: 'User'
                    },
                })
                .exec();
            super.responseJSON(res, 200, true, company);
        } catch (error) {
            next(error)
        }
    }
    async createTeam(req, res, next) {
        let _companyId = req.params.id
        let data = req.body;
        try {
            let team = await Team.create(data);
            await Company.findByIdAndUpdate(_companyId,
                {
                    $push: { listOfTeams: team.id }
                })
            super.responseJSON(res, 201, true, {});
        } catch (error) {
            next(error)
        }
    }
    async  createCompany(req, res, next) {
        let data = req.body;
        try {
            data.owner = req.user.id
            let company = await Company.create(data)
            super.responseJSON(res, 200, true, company)
        } catch (error) {
            next(error)
        }
    }
    async approveCompanies(req, res, next) {
        try {
            //   let compArray = req.body.companyNames.;
            let criteria = {
                companyName: { $in: req.body.companyNames }
            }
            let approvedCompanies = await Company.update(
                criteria,
                { $set: { confirmed: true } },
                { multi: true }
            )
            super.responseJSON(res, 200, true, approvedCompanies)
        } catch (error) {
            next(error)
        }
    }
    async getUserTeams(req, jes, next) {
        try {

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