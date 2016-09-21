process.env.NODE_ENV = 'test';
var Browser = require('zombie');
var mongoose = require('mongoose');

Browser.localhost('localhost', 3000);

describe('User visits add booking page', function() {

  var browser = new Browser();
  var app = require("../app.js");

  before(function(done) {
    browser.visit('/listings', done);

    mongoose.model('Booking').remove({}, function(err) {
      console.log('collection removed')
    });

  });

  describe('submits booking', function() {

    before(function(done) {
      browser
        .clickLink('my apartment 1')
        .fill('book_from', '2017-01-01')
        .fill('book_to', '2017-01-04')
        .pressButton('Request to book', done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('shows the booked item', function() {
      browser.assert.text("table", /TBD: name of the listing/);
    });

    it('should see my request page', function() {
      browser.assert.text('title', 'My requests');
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
