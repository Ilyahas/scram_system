let mongoose = require('mongoose')

let Schema = mongoose.Schema()

let Comment = new Schema({
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
