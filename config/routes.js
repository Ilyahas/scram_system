const auth = require('../api/routes/auth')
const company = require('../api/routes/company')
const task = require('../api/routes//task')
const user = require('../api/routes/user')
const errHandler = require('../api/errorHandler/errorMiddleware')
module.exports = app => {
  app.use('/auth', auth)
  app.use('/company', company)
  app.use('/task', task)
  app.use('/user', user)
  app.use(errHandler.errHandler)
}
