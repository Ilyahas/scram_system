const mongoose = require('mongoose')
const Card = require('./card')

const { Schema } = mongoose

const Lane = new Schema({
  slug: {
    type: String,
    default: '',
    // unique: true,
  },
  title: {
    type: String,
  },
  cards: [Card],
})
Lane.methods.getFullInfo = async () => {
  let cards = await this.populate('cards')
  cards = cards.toObject()
  return {
    _id: this._id,
    slug: this.slug,
    cards,
  }
}
Lane.statics = {
  async refreshCardsArr(id, cards) {
    const lane = await this.update(
      { id },
      {
        $set: {
          cards,
        },
      },
    )
    return lane
  },
}

module.exports = mongoose.model('Lane', Lane)
