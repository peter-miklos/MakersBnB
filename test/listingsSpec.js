process.env.NODE_ENV = 'test';
var Browser = require('zombie');
var mongoose = require('mongoose');

Browser.localhost('localhost', 3000);

describe('User visits add listing page', function() {

  var browser = new Browser();
  var app = require("../app.js");

  before(function(done) {
    mongoose.model('Listing').remove({}, function(err) {
      console.log('collection removed')
    });
    mongoose.model('User').create({name:      "Test User",
                                   email:     'test1@test.com',
                                   password:  '$2a$10$V4lKSiN/LpKWYLPgjuGUXevpu6zHO0gPEMWVo0syv8GwIc3H3p2xG'
    });
    browser.visit('/users/login').then(function() {
      browser
        .fill('email', 'test1@test.com')
        .fill('password', '111')
        .pressButton('Log in', done);
    });
  });

  describe('submits form', function() {

    before(function(done) {
      browser.visit('/listings/new').then(function() {
        browser
        .fill('name', "Makers Flat")
        .fill('description', "Large flat with nice view")
        .fill('price', 88)
        .fill('available', '2016-01-01')
        .pressButton('List my space!', done);
      });
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('shows the registered listing', function() {
      browser.assert.text("table", /Makers Flat/);
    });

    it('should see welcome page', function() {
      browser.assert.text('h1', 'Listings');
    });
  });

});
