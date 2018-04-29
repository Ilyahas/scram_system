const mongoose = require('mongoose')

const { Schema } = mongoose

const Team = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  teamName: {
    type: String,
    required: true,
  },
  teamlead: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  lanes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lane',
    },
  ],
  description: {
    type: String,
    default: '',
  },
})
module.exports = mongoose.model('Team', Team)
