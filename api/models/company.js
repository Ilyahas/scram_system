const mongoose = require('mongoose')

const { Schema } = mongoose

const Company = new Schema({
  companyName: {
    type: String,
    default: '',
    // unique:true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
  workers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  listOfTeams: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
  ],
})

module.exports = mongoose.model('Company', Company)
