var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, required: true},
  price: { type: Number, required: true},
  availableFrom: { type: Date, required: true },
  availableTo: { type: Date, required: true },
  owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Listing', listingSchema);
