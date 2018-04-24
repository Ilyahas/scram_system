const mongoose = require('mongoose')
const Card = require('./card')
const Schema = mongoose.Schema

let Lane = new Schema({
  slug: {
    type: String,
  },
  title: {
    type: String,
  },
  cards: [Card],
})
module.exports = mongoose.model('Lane', Lane)
