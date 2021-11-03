var express = require('express');
var env = require('dotenv').config()
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const Handlebars = require('handlebars');
const expressLayouts = require('express-ejs-layouts')

var authController =require('./controller/auth.controller');
var userController =require('./controller/user.controller');
var campaignController =require('./controller/campaign.controller');
const model=require("./models/index");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.set('views', path.join(__dirname, '/views/'));
app.use("/assets", express.static(__dirname + '/assets'));
// Set Templating Engine
app.use(expressLayouts)
app.set('layout', __dirname + '/views/layouts/dashboard');
//app.engine('ejs', expejs({ extname: 'ejs', defaultLayout: 'dashboard', layoutsDir: __dirname + '/views/layouts/',handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));

app.use('/', authController);
app.use('/', userController);
app.use('/', campaignController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is started on http://localhost:'+PORT);
});
