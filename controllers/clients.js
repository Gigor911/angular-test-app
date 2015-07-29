// Modules =================================================
var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var fs          = require('fs');
var db          = mongoose.connection;
var Schema      = mongoose.Schema;
var multer      = require('multer');
var moment      = require("moment");

// Mongoose schema =================================================
var clientsMemberSchema = new mongoose.Schema({
  name: String,
	title: String,
  description: String,
	image: String,
  link: String
});

// Mongoose model =================================================
var client = mongoose.model('client', clientsMemberSchema);

// Variables =================================================
var imgPathResponse = "./media/clients/";
var imgPath         = "./app/media/clients/";
var upload          = multer({dest: imgPath})

// Clients API =================================================
// Send object from DB =================================================
router.get('/clients', function(req, res, next) {
	client.find(function(err, client) {
	  if (err) return console.error(err);
	  res.send(client)
	});
});

// Get data for new client =================================================
router.post('/new_clients',upload.single('file'), function (req, res, next) {
  var body = req.body;
  var file = req.file;

  // Check for existing required fields in the request =================================================
  if (body.Title && body.Description && body.Link && body.Name && file) {

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
      var newClient = new client({
        name: body.Name,
        title: body.Title,
        description: body.Description,
        image: imgPathResponse + file.filename + ".jpg",
        link: body.Link
      });

      // Push to DB =================================================
      newClient.save(function(err) {
        if (err) return console.error(err);
      });

      // Send status =================================================
      res.end("ok")
    } else{
      // remove temporary file =================================================
      fs.unlink(imgPath + file.filename, function(err) {});
      // Send status =================================================
      res.end("image type must be 'jpg' or image size more than 500kb");
    };
  } else{
    // remove temporary file =================================================
    fs.unlink(imgPath + file.filename, function(err) {});
    // Send status =================================================
    res.end("required fields are empty");
  };
});

router.get('/clients/:id', function(req, res, next) {
  var id = req.params.id;
  client.findById(id, function(err, client) {
    res.send(client)
  })
});

module.exports = router;