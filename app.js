process.env.NODE_ENV ? process.env.NODE_ENV : process.env.NODE_ENV = 'development';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./models/db')
var listing = require('./models/listing')
var mongoose = require('mongoose');
var Listing = mongoose.model('Listing');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");

app.get('/', function (req, res) {
  res.send('Hello, Makers B&B welcomes you!!');
});

app.get("/listings/new", function (req, res) {
  res.render("listings/new", {});
});

app.post("/listings", function (req, res) {
  Listing.create({name: req.body.name,
                            description: req.body.description,
                            price: req.body.price,
                            availableFrom: req.body.available_from,
                            availableTo: req.body.available_to}),
        function (err, listing) {
          if (err) {
            res.send("There was a problem adding the information to the database.");
          } else {
            console.log('New listing has been created');
          }
        };
  res.redirect("/listings");
});

app.get("/listings", function(req, res) {
  var listingMap = {};
  Listing.find({}, function(err, listings) {
    listingMap = listings;
 });
  setTimeout(function() {
    res.render("listings/index", { listingMap });
  }, 500);
})

app.listen(3000, function () {
  console.log('Makers B&B app listening on port 3000!');
});


// https://expressjs.com/en/guide/routing.html - instruction how to create seperate files with routing
