process.env.NODE_ENV = 'test';
var Browser = require('zombie');
var mongoose = require('mongoose');

Browser.localhost('localhost', 3000);

describe('User visits the page and signs up', function() {

  var browser = new Browser();
  var app = require("../app.js");

  before(function(done) {
    browser.visit('/users/new', done);

    mongoose.model('User').remove({}, function(err) {
      console.log('User collection removed BEFORE');
    });
  });

  describe('signs up', function() {

    before(function(done) {
      browser
        .fill('name',    'Zombie')
        .fill('email', 'zombie1@dead.com')
        .fill('password', '111')
        .fill('password_confirmation', '111')
        .pressButton('Sign up', done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('shows the registered listing', function() {
      browser.assert.text("body", /Welcome Zombie/);
    });

    it('should see welcome page', function() {
      browser.assert.text('h1', 'Listings');
    });
  });


});
