var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;

var teamMemberSchema = new mongoose.Schema({
  	name: String,
  	image: String
});

var team = mongoose.model('team', teamMemberSchema);

var Alexei = new team({
  	name: "Alexei",
	image: "./media/team/Alexei.jpg"
});

Alexei.save(function(err) {
  if (err) return console.error(err);
});

var Helen = new team({
  	name: "Helen",
	image: "./media/team/Helen.jpg"
});

Helen.save(function(err) {
  if (err) return console.error(err);
});

var Olena = new team({
  	name: "Olena",
	image: "./media/team/Olena.jpg"
});

Olena.save(function(err) {
  if (err) return console.error(err);
});

/* Login service */
router.get('/team', function(req, res, next) {
	team.find(function(err, members) {
	  if (err) return console.error(err);
	  res.send(members)
	});
});

module.exports = router;