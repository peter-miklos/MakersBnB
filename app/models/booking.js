var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
  bookedFrom: Date,
  bookedTo: Date,
  confirmed: Boolean,
  totalPrice: Number
});

mongoose.model('Booking', bookingSchema);

//console.log('This file (listing.js) is loaded too!')
