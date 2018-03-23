const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose= require('mongoose')
const bearerToken = require('express-bearer-token');
const helmet = require('helmet');

const config = require('./config/config')
const auth = require('./api/routes/auth')
const company = require('./api/routes/company')
const task = require('./api/routes//task')
const user = require('./api/routes/user')
const errHandler = require('./api/errorHandler/errorMiddleware')
const cors= require('cors')
require('./api/models/company')
require('./api/models/user')
require('./api/models/token')

const apiDocs = require('./config/swagger')

mongoose.connect(config.mongoUrl)
mongoose.connection.on('connected',()=>{
  console.log('Mongoose connection opened on '+ config.mongoUrl)
})
mongoose.connection.on('error',()=>{
  console.log('Mongoose connection error  '+ config.mongoUrl)
})
var app = express();
app.use(cors())
// app.use(helmet())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bearerToken());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

apiDocs(app)
app.use('/auth',auth);
app.use('/company',company);
app.use('/task',task);
app.use('/user',user);

app.use(errHandler.errHandler)

app.listen( () => {
  console.log( `server was started at 3030 port` );
});


module.exports = app;
//TODO: add swager;