const Company = require('../models/company')
const Team = require('../models/team')
const BaseController = require('./baseController')

class CompanyController extends BaseController {
  async getListOfUnverifiedCompanies(req, res, next) {
    try {
      const unverifiedCompanies = await Company.find({ confirmed: false })
        .populate({
          path: 'owner',
          model: 'User',
          select: 'nickname email -_id',
        })
        .populate({
          path: 'workers',
          model: 'User',
          select: 'nickname -_id',
        })
        .exec()
      super.responseJSON(res, 200, true, unverifiedCompanies)
    } catch (error) {
      next(error)
    }
  }
  async getCompany(req, res, next) {
    try {
      const company = await Company.findOne(
        { owner: req.user },
        '-workers -confirmed',
      )
        .populate({
          path: 'listOfTeams',
          populate: {
            path: 'teamlead manager members',
            select: 'nickname',
            model: 'User',
          },
        })
        .exec()
      super.responseJSON(res, 200, true, company)
    } catch (error) {
      next(error)
    }
  }
  async createTeam(req, res, next) {
    const companyId = req.params.id
    const data = req.body
    data.companyId = companyId
    try {
      const team = await Team.create(data)
      await Company.findByIdAndUpdate(companyId, {
        $push: { listOfTeams: team.id },
      })
      const convTeam = await Team.findOne({ teamName: data.teamName }).populate({
        path: 'teamlead manager members',
      })
      super.responseJSON(res, 201, true, convTeam)
    } catch (error) {
      next(error)
    }
  }
  async createCompany(req, res, next) {
    const data = req.body
    try {
      data.owner = req.user.id
      const company = await Company.create(data)
      super.responseJSON(res, 200, true, company)
    } catch (error) {
      next(error)
    }
  }
  async approveCompanies(req, res, next) {
    try {
      const criteria = {
        companyName: { $in: req.body.companyNames },
      }
      const approvedCompanies = await Company.update(
        criteria,
        { $set: { confirmed: true } },
        { multi: true },
      )
      super.responseJSON(res, 200, true, approvedCompanies)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CompanyController
