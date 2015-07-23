// Modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose 	   = require('mongoose');
var db 			   = mongoose.connection;

// Configuration ===========================================
  
// Mongo DB conection
mongoose.connect('mongodb://localhost:27017/local');

db.on('error', function (err) {
  console.log('connection error', err);
});
db.once('open', function () {
  console.log('connected.');
});

// Port for application ==================================================
var port = process.env.PORT || 8080;

// Get all data/stuff of the body (POST) parameters ================================================== 
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users

// Routes ==================================================
var teamCtrl = require('./controllers/team');
var clientsCtrl = require('./controllers/clients');

// Routs ==================================================
app.get('/team', teamCtrl);

// Start app ===============================================
app.listen(port); 
console.log('server listening on port:  ' + port);
exports = module.exports = app;