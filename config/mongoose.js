const mongoose = require('mongoose')
const config = require('./config')
module.exports = () => {
    mongoose.connect(config.mongoUrl)

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connection opened on ' + config.mongoUrl)
    })
    mongoose.connection.on('error', () => {
        console.log('Mongoose connection error  ' + config.mongoUrl)
    })

}