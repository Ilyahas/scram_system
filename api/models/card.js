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
})

module.exports = Card
