// Modules =================================================
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;

// Mongoose schema =================================================
var teamMemberSchema = new mongoose.Schema({
  	name: String,
    lastName: String,
  	image: String
});

// Mongoose model =================================================
var team = mongoose.model('team', teamMemberSchema);

// Variables =================================================
var imgPath = "./media/team/";

// For tests: drop collection and create test persons =================================================
//=================================================
db.collections['teams'].drop();

var Alexei = new team({
  	name: "Alexei",
    lastName: "Volososhar",
	image: imgPath + "Alexei.jpg"
});

Alexei.save(function(err) {
  if (err) return console.error(err);
});

var Helen = new team({
  	name: "Helen",
    lastName: "Kolga",
	image: imgPath + "Helen.jpg"
});

Helen.save(function(err) {
  if (err) return console.error(err);
});

var Olena = new team({
  	name: "Olena",
    lastName: "Likhodei",
	image: imgPath + "Olena.jpg"
});

Olena.save(function(err) {
  if (err) return console.error(err);
});
//=================================================

// Team API =================================================
// Send object from DB =================================================
router.get('/team', function(req, res, next) {
	team.find(function(err, members) {
	  if (err) return console.error(err);
	  res.send(members)
	});
});

// Get data for new team member =================================================
router.post('/new_team', function(req, res, next) {
    console.log(req.body)
    res.end("ok")
});


module.exports = router;