const express = require('express');
var app = express();
const path = require('path');

const mongoose= require('mongoose')


const config = require('./config/config')
const expressSetup = require('./config/express')
const routes = require('./config/routes')
const apiDocs = require('./config/swagger')

expressSetup(app);

require('./api/models/company')
require('./api/models/user')
require('./api/models/token')


mongoose.connect(config.mongoUrl)

mongoose.connection.on('connected',()=>{
  console.log('Mongoose connection opened on '+ config.mongoUrl)
})
mongoose.connection.on('error',()=>{
  console.log('Mongoose connection error  '+ config.mongoUrl)
})

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