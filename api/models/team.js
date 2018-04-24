let mongoose = require('mongoose')

let Schema = mongoose.Schema

let Team = new Schema({
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
      ref: 'Task',
    },
  ],
  description: {
    type: String,
    default: '',
  },
})
module.exports = mongoose.model('Team', Team)
