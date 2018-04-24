const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('../api/docs/swagger.json')

module.exports = app => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
