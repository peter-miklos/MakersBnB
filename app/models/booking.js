var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
  bookedFrom: Date,
  bookedTo: Date,
  confirmed: Boolean,
  totalPrice: Number,
  listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing'
    },
  requester: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
    }
});

mongoose.model('Booking', bookingSchema);
