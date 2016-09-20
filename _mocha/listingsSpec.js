var Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

describe('User visits signup page', function() {

  var browser = new Browser();

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
