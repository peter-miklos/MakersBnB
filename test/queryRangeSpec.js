process.env.NODE_ENV = 'test';
var Browser = require('zombie');
var mongoose = require('mongoose');

Browser.localhost('localhost', 3000);

function pageLoaded(window){
  return window.document.querySelector(".container");
}

describe('User can search within a given date range', function() {

  var browser = new Browser();
  var app = require("../app.js");

  before(function(done) {
    mongoose.model('User').create({name:      "Test User",
                                   email:     'test1@test.com',
                                   password:  '$2a$10$V4lKSiN/LpKWYLPgjuGUXevpu6zHO0gPEMWVo0syv8GwIc3H3p2xG'
    });
      mongoose.model('Listing').create({name:        "Makers Flat",
                                     description: "Large flat with nice view",
                                     price: 60,
                                     available_from: '2017-01-01',
                                     available_to: '2017-01-10'
      });
      mongoose.model('Listing').create({name:        "Our House",
                                     description: "Large flat with nice view",
                                     price: 80,
                                     available_from: '2017-02-01',
                                     available_to: '2017-02-10'
      });

        console.log("user registry  & 2 listings are OK");

        browser.visit('/users/login').then(function() {
          browser
            .fill('email', 'test1@test.com')
            .fill('password', '111')
            .pressButton('Log in', done);
        });
        console.log("user sign in OK");
    });

    describe('user searches for booking availability and sees available listings', function() {
      before(function(done) {
      browser
        .fill('book_from', '2017-02-04')
        .fill('book_to', '2017-02-06')
        .pressButton('Search availability!', done);
      });
  });
    it('should be successful', function() {
      browser.assert.success();
    });

    it('shows the registered listing', function() {
      browser.assert.text("body", /Our House/);
    });

    it('should see welcome page', function() {
      browser.assert.text('title', /My bookings/);
    });
});
