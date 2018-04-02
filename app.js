const express = require('express');
var app = express();
const path = require('path');

const expressSetup = require('./config/express')
const routes = require('./config/routes')
const apiDocs = require('./config/swagger')
const mongooseSetup = require('./config/mongoose')

expressSetup(app);

require('./api/models/company')
require('./api/models/user')
require('./api/models/token')

mongooseSetup();

app.use(express.static(path.join(__dirname, 'public','build')));

apiDocs(app)
routes(app)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'public','build', 'index.html'));
});

app.listen( () => {
  console.log( `server was started at 3030 port` );
});


module.exports = app;