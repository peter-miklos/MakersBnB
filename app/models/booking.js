var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
  bookedFrom: Date,
  bookedTo: Date,
  confirmed: Boolean,
  rejected: Boolean,
  totalPrice: Number,
  listingName: String,
  listingOwner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
  },
  // listing: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Listing'
  //   },
  requester: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
  }
});

mongoose.model('Booking', bookingSchema);
