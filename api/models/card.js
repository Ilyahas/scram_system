let mongoose = require('mongoose')

let Schema = mongoose.Schema

let Card = new Schema({
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

module.exports = mongoose.model('Card', Card)
