const Team = require('../models/team')
const Lane = require('../models/lane')
const Card = require('../models/card')
const BaseController = require('./baseController')

class LaneController extends BaseController {
  async create(req, res, next) {
    const companyId = req.params.id
    const teamName = req.params.name
    const laneBody = req.body
    laneBody.teamName = teamName
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
  async update(req, res, next) {
    const _id = req.params.id
    const { body } = req
    try {
      const lane = Lane.updateCards(_id, body)
      super.responseJSON(res, lane ? 202 : 404, !!lane, lane)
    } catch (error) {
      next(error)
    }
  }
  async get(req, res, next) {
    const teamName = req.params.name
    try {
      const lanes = await Lane.find({ teamName })
      const cardsInfo = await Card.get(lanes)
      return super.responseJSON(res, lanes ? 200 : 404, !!lanes, cardsInfo)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
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
      // TODO delete all cards assosiated with lane
      await Lane.remove({ _id })
      super.responseJSON(res, team ? 202 : 404, !!team, team)
    } catch (error) {
      next(error)
    }
  }
  async addCard(req, res, next) {
    const _id = req.params.id
    const cardData = req.body.cardCreate
    cardData.idLane = _id
    try {
      const lane = Lane.addCard(_id, cardData)
      super.responseJSON(res, lane ? 200 : 400, !!lane, lane)
    } catch (error) {
      next(error)
    }
  }
  async updateCard(req, res, next) {
    const { cardId } = req.params
    const card = req.body.cardCreate
    try {
      const lane = await Card.findOneAndUpdate(
        {
          _id: cardId,
        },
        {
          $set: { card },
        },
      )
      super.responseJSON(res, lane ? 202 : 404, !!lane, lane)
    } catch (error) {
      next(error)
    }
  }
  async deleteCard(req, res, next) {
    const _id = req.params.id
    const { cardId } = req.params
    try {
      const cardToDelete = await Card.findById({ _id: cardId })
      await Lane.deleteCardPointers(_id, cardToDelete)
      cardToDelete.remove()
      super.responseJSON(
        res,
        cardToDelete ? 202 : 404,
        !!cardToDelete,
        cardToDelete,
      )
    } catch (error) {
      next(error)
    }
  }
}
module.exports = LaneController
