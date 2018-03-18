let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose= require('mongoose')
let bearerToken = require('express-bearer-token');
let helmet = require('helmet');
let config = require('./config/config')
let auth = require('./api/routes/auth')
let company = require('./api/routes/company')
let task = require('./api/routes//task')
let user = require('./api/routes/user')
let errHandler = require('./api/errorHandler/errorMiddleware')
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
var app = express();

app.use(helmet())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bearerToken());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth',auth);
app.use('/company',company);
app.use('/task',task);
app.use('/user',user);

app.use(errHandler.errHandler)



module.exports = app;
