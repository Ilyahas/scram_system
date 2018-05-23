const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
const bearerToken = require('express-bearer-token')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

module.exports = (app) => {
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'hjs')

  app.use(bearerToken())
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
}
