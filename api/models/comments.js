const mongoose = require('mongoose')

const { Schema } = mongoose

const Comment = new Schema({
  commnet: {
    type: String,
  },
  publishedDate: {
    type: Date,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('Comment', Comment)
