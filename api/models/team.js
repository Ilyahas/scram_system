const mongoose = require('mongoose')

const { Schema } = mongoose

const Team = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
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
  dashboards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Dashboard',
    },
  ],
  description: {
    type: String,
    default: '',
  },
})
module.exports = mongoose.model('Team', Team)
