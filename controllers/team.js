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
	image: String,
  email: String,
  position: String
});

// Mongoose model =================================================
var team = mongoose.model('team', teamMemberSchema);

// Variables =================================================
var imgPathResponse = "./media/team/";
var imgPath         = "./app/media/team/";
var upload          = multer({dest: imgPath})

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
  if (body.Name && body.LastName && body.Email && body.Position && file) {

    // Check if image type is JPEG =================================================
    if (file.mimetype == "image/jpeg" && file.size < 500000) {
      // Rename uploaded files and save =================================================
      fs.rename(imgPath + file.filename, imgPath + file.filename + ".jpg", function(err) {
        // error handler =================================================
        if ( err ) {
          console.log('ERROR: ' + err);
          res.end("server error")
        }
      });

      // Create model =================================================
      var member = new team({
        name: body.Name,
        lastName: body.LastName,
        image: imgPathResponse + file.filename + ".jpg",
        email: body.Email,
        position: body.Position
      });

      // Push to DB =================================================
      member.save(function(err) {
        if (err) return console.error(err);
      });

      // Send status =================================================
      res.end("ok")
    } else{
      // remove temporary file =================================================
      fs.unlink(imgPath + file.filename, function(err) {})
      // Send status =================================================
      res.end("image type must be 'jpg' or image size more than 500kb");
    };
  } else{
    // remove temporary file =================================================
    fs.unlink(imgPath + file.filename, function(err) {})
    // Send status =================================================
    res.end("required fields are empty")
  };
});

module.exports = router;