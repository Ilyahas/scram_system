const mongoose = require('mongoose')

const { Schema } = mongoose

const User = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  nickname: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  salt: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  confirmationToken: {
    type: String,
    default: '',
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: '0',
  },
})

User.methods.setConfirmationToken = () => {
  this.confirmationToken = this.generateJWT
}

module.exports = mongoose.model('User', User)
