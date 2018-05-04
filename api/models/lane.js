const mongoose = require('mongoose')
const Card = require('./card')

const { Schema } = mongoose

const Lane = new Schema({
  slug: {
    type: String,
    default: '',
    // unique: true,
  },
  teamName: {
    type: String,
  },
  title: {
    type: String,
  },
  cardsSize: {
    type: Number,
  },
  head: {
    type: Schema.Types.ObjectId,
    ref: 'Card',
  },
  tail: {
    type: Schema.Types.ObjectId,
    ref: 'Card',
  },
})
Lane.methods.getFullInfo = async () => {
  let cards = await this.populate('cards')
  cards = cards.toObject()
  return {
    _id: this._id,
    slug: this.slug,
    title: this.title,
    cards,
  }
}
Lane.statics = {
  async addCard(_id, cardData) {
    try {
      const card = await Card.create(cardData)
      const lane = await this.findById(_id)
      const tailElem = lane.tail
      const query = {}
      query.$set = tailElem ? { next: card.id } : null
      if (tailElem) {
        await Card.findOneAndUpdate(
          { _id: tailElem },
          {
            ...query,
          },
        )
      } else {
        lane.head = card
      }
      lane.tail = card
      await lane.save()
      return lane
    } catch (error) {
      throw new Error(error)
    }
  },
  async updateCards(laneId, body) {
    const lane = await this.findById(laneId)
    const insertedCard = await Card.findById(body.currentId)
    // delete card pointers from old lane if lanes not matched
    if (!lane._id.equals(insertedCard.idLane)) {
      await this.deleteCardPointers(insertedCard.idLane, insertedCard)
      insertedCard.idLane = laneId
    }
    const prevCard = body.prevId && await Card.findById(body.prevId)
    const isLane = isHeadOrTailChanged(lane, prevCard && prevCard._id)
    isLane.head = !prevCard
    if (isLane.head || isLane.tail) {
      if (!isLane.head && !isLane.tail) {
        lane.head = insertedCard._id
        lane.tail = insertedCard._id
      }
      if (isLane.tail && isLane.head) {
        lane.head = insertedCard._id
        lane.tail = prevCard._id
        insertedCard.next = prevCard._id
      } else if (isLane.tail) {
        prevCard.next = insertedCard._id
        prevCard.save()
        lane.tail = insertedCard._id
      } else if (isLane.head) {
        insertedCard.next = lane.head
        lane.head = insertedCard._id
      }
      insertedCard.save()
      lane.save()
      return insertedCard
    }
    insertedCard.idLane = lane._id
    insertedCard.next = prevCard.next
    prevCard.next = insertedCard._id
    insertedCard.save()
    prevCard.save()
    return lane
  },
  async deleteCardPointers(_id, cardToDelete) {
    const laneToUpdate = await this.findById(_id)
    const prevCard = await Card.findOne({ next: cardToDelete._id })
    const isLane = isHeadOrTailChanged(laneToUpdate, cardToDelete._id)
    if (isLane.head || isLane.tail) {
      if (isLane.head) {
        laneToUpdate.head =
          cardToDelete && cardToDelete.next ? cardToDelete.next : undefined
      }
      if (isLane.tail) {
        laneToUpdate.tail = prevCard && prevCard._id ? prevCard._id : undefined
        if (prevCard) {
          prevCard.next = undefined
          await prevCard.save()
        }
      }
      await laneToUpdate.save()
    }
    if (isPrevExists(cardToDelete, prevCard)) {
      prevCard.next = cardToDelete.next
      await prevCard.save()
    }
  },
}
const isHeadOrTailChanged = (lane, _id) => {
  const data = {}
  data.head = lane.head && lane.head.equals(_id)
  data.tail = lane.tail && lane.tail.equals(_id)
  return data
}
const isPrevExists = (cardToDelete, prevCard) =>
  cardToDelete && cardToDelete.next && prevCard
module.exports = mongoose.model('Lane', Lane)
