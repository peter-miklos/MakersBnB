var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./models/db.js')
var dupa = require('./models/listing.js')


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

  var listing = new Listing({  name: req.body.name,
                            description: req.body.description,
                            price: req.body.price,
                            availableFrom: req.body.available_from,
                            availableTo: req.body.available_to });

  listing.save(function (err, test) {
    if (err) return console.error(err);
    console.log('uListing saved to DB') });


  res.redirect("/");
});

app.listen(3000, function () {
  console.log('Makers B&B app listening on port 3000!');
});


// https://expressjs.com/en/guide/routing.html - instruction how to create seperate files with routing
