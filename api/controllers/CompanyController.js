const Company = require('../models/company')
const Team = require('../models/team')
const Lane = require('../models/lane')
const BaseController = require('./BaseController')

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
            select: 'email',
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
    try {
      const team = await Team.create(data)
      await Company.findByIdAndUpdate(companyId, {
        $push: { listOfTeams: team.id },
      })
      super.responseJSON(res, 201, true, {})
    } catch (error) {
      next(error)
    }
  }
  async createLane(req, res, next) {
    const companyId = req.params.id
    const teamName = req.params.name
    const laneBody = req.body

    try {
      const lane = await Lane.create(laneBody)
      const team = await Team.findOneAndUpdate(
        { companyId, teamName },
        {
          $push: { lanes: lane.id },
        },
      )
      return super.responseJSON(res, team ? 200 : 400, !!team, team)
    } catch (error) {
      next(error)
    }
  }
  async deleteLane(req, res, next) {
    const companyId = req.params.id
    const teamName = req.params.name
    const _id = req.params.laneId
    try {
      const team = await Team.findOneAndUpdate(
        { companyId, teamName },
        {
          $pull: {
            lanes: _id,
          },
        },
      )
      await Lane.remove({ _id })
      super.responseJSON(res, team ? 202 : 404, !!team, team)
    } catch (error) {
      next(error)
    }
  }
  async addCard(req, res, next) {
    const _id = req.params.id
    const cardData = req.body.cardCreate
    try {
      const lane = await Lane.findOneAndUpdate(
        {
          _id,
        },
        {
          $push: {
            cards: cardData,
          },
        },
      )
      super.responseJSON(res, lane ? 200 : 400, !!lane, lane)
    } catch (error) {
      next(error)
    }
  }
  async updateCard(req, res, next) {
    const _id = req.params.id
    const { cardId } = req.params
    const card = req.body
    try {
      const lane = await Lane.findOneAndUpdate(
        {
          _id,
          'cards._id': cardId,
        },
        {
          $set: { 'cards.$': card },
        },
      )
      super.responseJSON(res, lane ? 202 : 404, !!lane, lane)
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
