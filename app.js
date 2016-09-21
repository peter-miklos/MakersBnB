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
  Listing.find({}, function(err, listings) {
    res.render("listings/index", { listings });
 });
})

app.get("/bookings/new", function(req, res) {
  require('url').parse("/booking/new", true);
  Listing.findById(req.query.id, function(err, listing) {
    res.render("bookings/new", { listing })
  })
})

app.post("/bookings/new", function(req, res) {
  Listing.findById("57e1497c69577f313a3a148d", function(err, currentListing) {
    Booking.create({bookedFrom: req.body.book_from,
                    bookedTo: req.body.book_to,
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
      res.redirect("/bookings");
  });
});

app.get("/bookings", function(req, res) {
  Booking.find({}, function(err, bookings) {
    res.render("bookings/index", { bookings });
  });
})

app.listen(3000, function () {
  console.log('Makers B&B app listening on port 3000!');
});

// https://expressjs.com/en/guide/routing.html - instruction how to create seperate files with routing
