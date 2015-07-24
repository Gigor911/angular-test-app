// Modules =================================================
var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var fs          = require('fs');
var db          = mongoose.connection;
var Schema      = mongoose.Schema;
var multer      = require('multer');

// Mongoose schema =================================================
var teamMemberSchema = new mongoose.Schema({
	name: String,
  lastName: String,
	image: String
});

// Mongoose model =================================================
var team = mongoose.model('team', teamMemberSchema);

// Variables =================================================
var imgPathResponse = "./media/team/";
var imgPath         = "./app/media/team/";
var upload          = multer({dest: imgPath})

// For tests: drop collection and create test persons =================================================
//=================================================
// db.collections['teams'].drop();

// var Alexei = new team({
//   name: "Alexei",
//   lastName: "Volososhar",
// 	image: imgPathResponse + "Alexei.jpg"
// });

// Alexei.save(function(err) {
//   if (err) return console.error(err);
// });
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
router.post('/new_team',upload.single('file'), function (req, res, next) {
  var body = req.body;
  var file = req.file;

  // Check for existing required fields in the request =================================================
  if (body.Name && body.LastName && file) {

    // Check if image type is JPEG =================================================
    if (file.mimetype == "image/jpeg") {
      // Rename uploaded files and save =================================================
      fs.rename(imgPath + file.filename, imgPath + file.filename + ".jpg", function(err) {
        // error handler =================================================
        if ( err ) {
          console.log('ERROR: ' + err);
          res.end("server error")
        }
      });

      var member = new team({
        name: body.Name,
        lastName: body.LastName,
        image: imgPathResponse + file.filename + ".jpg"
      });

      member.save(function(err) {
        if (err) return console.error(err);
      });

      res.end("ok")
    } else{
      // remove temporary file =================================================
      fs.unlink(imgPath + file.filename, function(err) {})
      res.end("image type must be jpg")
    };
  } else{
    // remove temporary file =================================================
    fs.unlink(imgPath + file.filename, function(err) {})
    res.end("required fields are empty")
  };
});

module.exports = router;