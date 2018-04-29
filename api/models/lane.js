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
}

module.exports = mongoose.model('Lane', Lane)
