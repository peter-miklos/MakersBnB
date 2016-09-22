var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
  bookedFrom: Date,
  bookedTo: Date,
  confirmed: Boolean,
  totalPrice: Number,
  listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing'
    }
});

mongoose.model('Booking', bookingSchema);

//console.log('This file (listing.js) is loaded too!')
