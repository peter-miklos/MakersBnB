process.env.NODE_ENV ? process.env.NODE_ENV : process.env.NODE_ENV = 'development';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./config/db');
var listing = require('./app/models/listing');
var user = require('./app/models/user');
var mongoose = require('mongoose');
var session = require('express-session');
var Listing = mongoose.model('Listing');
var booking = require('./app/models/booking');
var Booking = mongoose.model('Booking');
var User = mongoose.model('User');
var engine = require('ejs-locals');

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt');
  var saltRounds = 10;
  var myPlaintextPassword = 's0/\/\P4$$w0rD';
  var someOtherPlaintextPassword = 'not_bacon';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'mysecretphrase',
                  resave: false,
                  saveUninitialized: true
}));

app.use(function(req,res,next){
  res.locals.currentUser = req.session.user;
  next()
})


app.engine('ejs', engine);
app.set("view engine", "ejs");

app.get('/', function (req, res) {
  if (req.session.user) {
    res.redirect("/listings");
  }
  else {
    res.redirect("/users/login");
  }


  res.send('Hello, Makers B&B welcomes you!!');
});

app.get("/listings/new", function (req, res) {
  if (req.session.user) {
    res.render("listings/new", {});
  }
  else {
    res.redirect("/users/login");
  }
});

app.post("/listings", function (req, res) {
  Listing.create({name: req.body.name,
                  description: req.body.description,
                  price: req.body.price,
                  availableFrom: req.body.available_from,
                  availableTo: req.body.available_to,
                  owner: req.session.user.id
                }),
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
  var currentUser
  if(!!req.session.user) {
    currentUser = req.session.user};
  Listing.find({}, function(err, listings) {
    res.render("listings/index", { listings, currentUser });
 });
});

app.get("/bookings/new", function(req, res) {
  if (req.session.user) {
    require('url').parse("/booking/new", true);
    Listing.findById(req.query.id, function(err, listing) {
      req.session.listing = listing;
      req.session.save();
      res.render("bookings/new", { listing })
    });
  }
  else {
    res.redirect("/users/login");
  }
});

app.post("/bookings/new", function(req, res) {
  Listing.findById(req.session.listing, function(err, currentListing) {
    console.log(currentListing.name);
    Booking.create({bookedFrom: req.body.book_from,
                    bookedTo: req.body.book_to,
                    confirmed: false,
                    totalPrice: 120,
                    listing: currentListing.name,
                    requester: req.session.user
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
  Booking.find({'requester': req.session.user}, function(err, bookings) {
    var currentListing = req.session.listing;
    res.render("bookings/index", { bookings, currentListing });
  });
})

app.get("/users/new", function (req, res) {
  res.render("users/new", {});
});

app.post("/users/new", function (req, res) {
  if (req.body.password === req.body.password_confirmation) {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        User.create({name:      req.body.name,
                     email:     req.body.email,
                     password:  hash            }),
        function (err, listing) {
          if (err) {
            res.send("There was a problem adding the information to the database.");
          }
          else {
            console.log('New listing has been created');
          }
        };
        setTimeout(function() {
          User.findOne({'email': req.body.email}, function(err,user){
            req.session.user = user;
            req.session.save();
            res.redirect("/listings");
          });
        }, 500);
      });
  }
  else {
    console.log("User add failure, password mismatch?");
    //add flash message functonality
    res.redirect("/users/new")};
});

app.get('/users/login', function(req, res){
  res.render("users/login", {});
});

app.post('/users/login', function(req, res){
  var userInput = req.body.password;
  User.findOne({'email': req.body.email}, function(err,user){
    var currentPassword = user.password;
    bcrypt.compare(userInput, currentPassword, function(err, bcryptRes) {
        if (bcryptRes == true) {
          User.findOne({'email': req.body.email}, function(err, user){
            req.session.user = user;
            req.session.save();
          });
          res.redirect("/listings");
        } else {
          res.redirect("/users/login");
        }
    });
  });
});

app.get('/listings_filter', function(req, res){
  setTimeout(function() {
    console.log(req.query.book_from);
  }, 500);
  var name;
  if(!!req.session.user) {
    name = req.session.user.name};
  Listing.find({'availableFrom': {'$gte': req.query.book_from}},

                // {'availableTo': {'$lte': req.body.book_to}},
               function(err,listings){
    res.render("listings/index", { listings, name });
  });
});

app.get('/users/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/listings');
});

app.listen(3000, function () {
  console.log('Makers B&B app listening on port 3000!');
});

// https://expressjs.com/en/guide/routing.html - instruction how to create seperate files with routing
