process.env.NODE_ENV ? process.env.NODE_ENV : process.env.NODE_ENV = 'development';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./config/db');
var listing = require('./app/models/listing');
var mongoose = require('mongoose');
var Listing = mongoose.model('Listing');
var booking = require('./app/models/booking');
var Booking = mongoose.model('Booking');

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

app.get("/bookings/new", function(req, res) {
  require('url').parse("/booking/new", true);
  var listing = {};
  Listing.findById(req.query.id, function(err, item) {
    listing = item;
  })

  setTimeout(function() {
    res.render("bookings/new", { listing })
  }, 500);
})

app.post("/bookings/new", function(req, res) {
  var currentListing = {};
  Listing.findById("57e1497c69577f313a3a148d", function(err, item) { currentListing = item});

  setTimeout(function() {
    Booking.create({bookedFrom: req.body.book_to,
                    bookedTo: req.body.book_from,
                    confirmed: false,
                    totalPrice: 120,
                    listing: currentListing
                    }),
      function (err, booking) {
        if (err) {
          res.send("There was a problem adding the information to the database.");
        } else {
          console.log('New booking has been created');
        }
      };
  }, 500);

  setTimeout(function() {
    res.redirect("/bookings");
  }, 500);
});

app.get("/bookings", function(req, res) {
  var bookingsMap = {};
  Booking.find({}, function(err, bookings) {
    bookingsMap = bookings;
  });
  setTimeout(function() {
    res.render("bookings/index", { bookingsMap });
  }, 500)
})

app.listen(3000, function () {
  console.log('Makers B&B app listening on port 3000!');
});


// https://expressjs.com/en/guide/routing.html - instruction how to create seperate files with routing
