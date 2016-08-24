//Dependencies===========================================
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var exphbs = require('express-handlebars');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var app = express();


//Configure the app======================================
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'session secret key' }));
app.use(express.static(process.cwd() + '/public'));


//Database connection====================================
var databaseUrl = 'userDB';
var collections = ['users'];


//Connect to Mongoose====================================
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userDB');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log("We're connected");
})


var routes = require('./controllers/controller.js');
app.use('/', routes);

exports.getUsers = function(req, res) {
  if (config.debug)
    console.log("user.getUsers()");

  User.find(function(err, users) {
    if (err)
      return res.send(err);

    if (config.debug)
      console.log("users", users);

    res.json(users);
  });
};


//MAKE THE CONNECTION=====================================
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Listening on: ' + PORT);
});


