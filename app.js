const express = require('express')

const app = express()
const path = require('path')

const expressSetup = require('./config/express')
const routes = require('./config/routes')
const apiDocs = require('./config/swagger')
const mongooseSetup = require('./config/mongoose')

expressSetup(app)

require('./api/models/company')
require('./api/models/user')
require('./api/models/token')


mongooseSetup()

app.use(express.static(path.join(__dirname, 'public', 'build')))

apiDocs(app)
routes(app)

app.get('/*', (req, res) => {
  console.log('-----------------------------')
  res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'))
})
app.use((err, req, res) => {
  if (err.code === 11000) {
    let [, field] = err.message.split('.$');
    [field] = field.split(' dup key')
    field = field.substring(0, field.lastIndexOf('_'))
    res.status(400).json({
      requestStatus: false,
      requestResult: {
        error: err.message,
        duplicate: field,
      },
    })
  } else {
    console.log('==============================')
    console.log(err)
    console.log('request', req)
    res.status(400).json({
      requestStatus: false,
      requestResult: {
        err,
      },
    })
  }
})

app.listen(() => {
  console.log(`server was started at ${process.env.PORT || '3030'} port`)
})

module.exports = app
