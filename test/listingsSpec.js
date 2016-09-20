var Browser = require('zombie');

Browser.localhost('localhost', 3000);

describe('User visits add listing page', function() {

  var browser = new Browser();
  var app = require("../app.js");

  before(function(done) {
    browser.visit('/listings/new', done);
  });

  describe('submits form', function() {

    before(function(done) {
      browser
        .fill('name',    'Zombie Dead')
        .fill('description', 'Lorem Ipsum is simply dummy text of the printing versions of Lorem Ipsum.')
        .fill('price', '60')
        .fill('available_from', '2016-01-01')
        .fill('available_to', '2016-12-31')
        .pressButton('List my space!', done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see welcome page', function() {
      browser.assert.text('title', 'Listing added');
    });
  });
});