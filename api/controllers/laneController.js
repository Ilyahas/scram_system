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
    const cards = req.body
    try {
      const lane = await Card.refreshCardsArr(_id, cards)
      return super.responseJSON(res, lane ? 202 : 404, !!lane, {})
    } catch (error) {
      next(error)
    }
  }
  async get(req, res, next) {
    // const companyId = req.params.id
    const teamName = req.params.name
    try {
      const lanes = await Lane.find({ teamName })
      const cardsInfo = await Card.get(lanes)
      return super.responseJSON(res, lanes ? 200 : 404, !!lanes, {
        cardsInfo,
      })
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
      const lane = Lane.addCard(_id, cardData)
      super.responseJSON(res, lane ? 200 : 400, !!lane, lane)
    } catch (error) {
      next(error)
    }
  }
  async updateCard(req, res, next) {
    // const _id = req.params.id
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
      const laneToUpdate = await Lane.findById(_id)
      const cardToDelete = await Card.findByIdAndRemove({ _id: cardId })
      const prevCard = await Card.findOne({ next: cardId })
      if (isHeadOrTailChanged(laneToUpdate, cardToDelete)) {
        const query = constructDeleteQueue(
          cardToDelete,
          prevCard,
          isOneElement(laneToUpdate),
        )
        if (isLaneUpdated(query)) {
          if ('head' in query) {
            laneToUpdate.head = query.head
          }
          if ('tail' in query) {
            laneToUpdate.tail = query.tail
            prevCard.next = undefined
            await prevCard.save()
          }
          await laneToUpdate.save()
        }
      }
      if (isPrevExists(cardToDelete, prevCard)) {
        prevCard.next = cardToDelete.next
        await prevCard.save()
      }
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
const constructDeleteQueue = (cardToDelete, prevCard, isOneElem) => {
  const query = {}
  if (!isOneElem) {
    Object.assign(
      query,
      cardToDelete.next ? { head: cardToDelete.next } : null,
      prevCard ? { tail: prevCard.id } : null,
    )
  } else {
    Object.assign(query, { head: undefined, tail: undefined })
  }
  return query
}
const isPrevExists = (cardToDelete, prevCard) =>
  cardToDelete && cardToDelete.next && prevCard
const isOneElement = laneToUpdate =>
  laneToUpdate && laneToUpdate.head.equals(laneToUpdate.tail)
const isHeadOrTailChanged = (comparedObj, deletedObj) =>
  (comparedObj.head && comparedObj.head.equals(deletedObj._id)) ||
  (comparedObj.tail && comparedObj.tail.equals(deletedObj._id))
const isLaneUpdated = query => 'head' in query || 'tail' in query
module.exports = LaneController
