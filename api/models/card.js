const mongoose = require('mongoose')

const { Schema } = mongoose

const Card = new Schema({
  slug: {
    type: String,
  },
  title: {
    type: String,
  },
  label: {
    type: String,
  },
  description: {
    type: String,
  },
  assignedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  next: {
    type: Schema.Types.ObjectId,
    ref: 'Card',
  },
})
Card.statics = {
  async get(lanes) {
    const laneArr = []
    for (let i = 0; i < lanes.length; i += 1) {
      const laneObj = {}
      const item = lanes[i]
      laneObj.lane = item
      const cards = []
      if (item.head) {
        let current = await this.findById(item.head)
        cards.push(current)
        while (current && current.next) {
          current = await this.findById(current.next)
          cards.push(current)
        }
      }
      laneObj.cards = cards
      laneArr.push(laneObj)
    }
    return laneArr
  },
}
module.exports = mongoose.model('Card', Card)
