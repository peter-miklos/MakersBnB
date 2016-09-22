process.env.NODE_ENV = 'test';
var Browser = require('zombie');
var mongoose = require('mongoose');

Browser.localhost('localhost', 3000);

describe('User visits the page and signs in', function() {

  var browser = new Browser();
  var app = require("../app.js");

  before(function(done) {
    mongoose.model('User').remove({}, function(err) {
      console.log('User collection removed BEFORE');
    });

    mongoose.model('User').create({  name:      "Zombie",
                                    email:     'zombie1@dead.com',
                                    password:  '$2a$10$V4lKSiN/LpKWYLPgjuGUXevpu6zHO0gPEMWVo0syv8GwIc3H3p2xG'
      });

    browser.visit('/users/login', done);
  });

  describe('signs in', function() {

    before(function(done) {
      browser
        .fill('email', 'zombie1@dead.com')
        .fill('password', '111')
        .pressButton('Log in', done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('shows the registered listing', function() {
      browser.assert.text("nav", /Logged in: zombie1@dead.com/);
    });

    it('should see welcome page', function() {
      browser.assert.text('h1', 'Listings');
    });
  });


});
