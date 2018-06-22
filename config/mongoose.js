const mongoose = require('mongoose')
const config = require('./config')

module.exports = () => {
  mongoose.connect(
    process.env.NODE_ENV === 'test' ? config.testMongo : config.mongoUrl,
  )

  mongoose.connection.on('connected', () => {
    console.log(
      `Mongoose connection opened on ${
        process.env.NODE_ENV === 'test' ? config.testMongo : config.mongoUrl
      }`,
    )
  })
  mongoose.connection.on('error', () => {
    console.log(
      `Mongoose connection error  ${
        process.env.NODE_ENV === 'test' ? config.testMongo : config.mongoUrl
      }`,
    )
  })
}
