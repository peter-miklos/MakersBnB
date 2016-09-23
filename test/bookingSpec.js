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
                                   available: '2016-12-31'
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
        .fill('filter_date', '2016-12-31')
        .clickLink('Makers Flat', function(){
          browser
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
        .fill('available', '2017-01-01')
        .pressButton('Request to book', done);
    });

    // Error message should be thrown
  });

  describe('submits booking with no start date', function() {

    before(function(done) {
      browser
        // TBD
        .fill('available', '2017-01-01')
        .pressButton('Request to book', done);
    });

    // Error message should be thrown
  });

  describe('submits booking with no end date', function() {

    before(function(done) {
      browser
        // TBD
        .fill('available', '2017-01-04')
        .pressButton('Request to book', done);
    });

    // Error message should be thrown
  });

  describe('submits booking with dates out of the available period', function() {

    before(function(done) {
      browser
        // TBD
        .fill('available', '2020-01-11')
        .pressButton('Request to book', done);
    });

    // Error message should be thrown
  });

  describe('booked request is shown at my requests page', function() {

    before(function(done) {
      browser
        // TBD
        .fill('available', '2017-01-01')
        .pressButton('Request to book', done);
    });

    // Error message should be thrown
  });
});

describe('User visits list of bookings and confirm or reject', function() {

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
                                   available: '2016-12-31'
    });
    browser.visit('/users/login').then(function() {
      browser
        .fill('email', 'test1@test.com')
        .fill('password', '111')
        .pressButton('Log in', done);
    });
  });

  describe('confirm booking', function() {

    before(function(done) {
      browser
        .fill('filter_date', '2016-12-31')
        .clickLink('Makers Flat', function(){
          browser
            .pressButton('Request to book', function() {
              browser.visit('/listings').then(function() {
                browser
                  .fill('filter_date', '2016-12-31')
                  .clickLink('Makers Flat', function() {
                    browser
                      .pressButton('Request to book', function() {
                        browser
                          .pressButton('Confirm', done);
                      })
                  })
              })
            })
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

  describe('confirm booking', function() {

    before(function(done) {
      browser
        .fill('filter_date', '2016-12-31')
        .clickLink('Makers Flat', function(){
          browser
            .pressButton('Request to book', function() {
              browser
                .pressButton('Reject', done)
            })
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

    // Error message should be thrown
  });

});
