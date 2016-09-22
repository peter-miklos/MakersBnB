var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  availableFrom: Date,
  availableTo: Date,
  owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Listing', listingSchema);
