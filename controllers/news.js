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
var newsMemberSchema = new mongoose.Schema({
	title: String,
  description: String,
	image: String,
  date: String,
  content: String
});

// Mongoose model =================================================
var news = mongoose.model('news', newsMemberSchema);

// Variables =================================================
var imgPathResponse = "./media/news/";
var imgPath         = "./app/media/news/";
var upload          = multer({dest: imgPath})

// Team API =================================================
// Send object from DB =================================================
router.get('/news', function(req, res, next) {
	news.find(function(err, news) {
	  if (err) return console.error(err);
	  res.send(news)
	});
});

// Get data for new team member =================================================
router.post('/new_news',upload.single('file'), function (req, res, next) {
  var body = req.body;
  var file = req.file;

  // Check for existing required fields in the request =================================================
  if (body.Title && body.Description && body.Content && file) {

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

      // Get current date =================================================
      var now = moment(new Date());
      var date = now.format("D MMM YYYY");

      // Create model =================================================
      var member = new team({
        title: body.Title,
        description: body.Description,
        image: imgPathResponse + file.filename + ".jpg",
        date: date,
        content: body.Content
      });

      // Push to DB =================================================
      member.save(function(err) {
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

router.get('/news/:id', function(req, res, next) {
  var id = req.params.id;
  news.findById(id, function(err, news) {
    res.send(news)
  })
});

module.exports = router;