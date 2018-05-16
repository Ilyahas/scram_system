const mongoose = require('mongoose')

const { Schema } = mongoose

const Dashboard = new Schema({
  name: {
    type: String,
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
})

module.exports = mongoose.model('Dashboard', Dashboard)
