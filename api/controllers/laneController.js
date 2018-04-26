const Lane = require('../models/lane')
const BaseController = require('./BaseController')

class LaneController extends BaseController {
  async create(req, res, next) {
    const newLane = req.body
    try {
      const createdLane = await Lane.create(newLane)
      super.responseJSON(res, 200, true, createdLane)
    } catch (error) {
      next(error)
    }
  }
  async update(req, res, next) {
    const { card } = req.body
    const { id } = req.params
    try {
      const lane = Lane.refreshCardsArr(id, card)
      super.responseJSON(res, lane ? 202 : 404, !!lane, lane)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    const { id } = req.params
    try {
      Lane.remove({ id })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = LaneController
