process.env.NODE_ENV = 'test';
var Browser = require('zombie');
var mongoose = require('mongoose');

Browser.localhost('localhost', 3000);

describe('User visits add booking page', function() {

  var browser = new Browser();
  var app = require("../app.js");

  before(function(done) {
    mongoose.model('Booking').remove({}, function(err) {
      console.log('collection removed')
    });
    mongoose.model('User').create({name:      "Test User",
                                   email:     'test1@test.com',
                                   password:  '$2a$10$V4lKSiN/LpKWYLPgjuGUXevpu6zHO0gPEMWVo0syv8GwIc3H3p2xG'
    });
    mongoose.model('Listing').create({name:        "Makers Flat",
                                   description: "Large flat with nice view",
                                   price: 88,
                                   available_from: '2016-01-01',
                                   available_to: '2016-12-31'
    });
    browser.visit('/users/login').then(function() {
      browser
        .fill('email', 'test1@test.com')
        .fill('password', '111')
        .pressButton('Log in', done);
    });
  });

  describe('submits booking', function() {

    before(function(done) {
      browser
        .clickLink('Makers Flat', function(){
          browser
            // .fill('book_from', '2016-12-01')
            // .fill('book_to', '2016-12-10')
            .pressButton('Request to book', done)
        });
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('shows the booked item', function() {
      browser.assert.text("table", /Makers Flat/);
    });

    it('should see my request page', function() {
      browser.assert.text('h1', 'Bookings');
    });
  });

  describe('submits booking with wrong dates', function() {

    before(function(done) {
      browser
        // TBD
        .fill('book_from', '2017-01-04')
        .fill('book_to', '2017-01-01')
        .pressButton('Request to book', done);
    });

    // Error message should be thrown
  });

  describe('submits booking with no start date', function() {

    before(function(done) {
      browser
        // TBD
        .fill('book_to', '2017-01-01')
        .pressButton('Request to book', done);
    });

    // Error message should be thrown
  });

  describe('submits booking with no end date', function() {

    before(function(done) {
      browser
        // TBD
        .fill('book_from', '2017-01-04')
        .pressButton('Request to book', done);
    });

    // Error message should be thrown
  });

  describe('submits booking with dates out of the available period', function() {

    before(function(done) {
      browser
        // TBD
        .fill('available_from', '2020-01-04')
        .fill('available_to', '2020-01-11')
        .pressButton('Request to book', done);
    });

    // Error message should be thrown
  });

  describe('booked request is shown at my requests page', function() {

    before(function(done) {
      browser
        // TBD
        .fill('available_from', '2017-01-04')
        .fill('available_to', '2017-01-01')
        .pressButton('Request to book', done);
    });

    // Error message should be thrown
  });


});
