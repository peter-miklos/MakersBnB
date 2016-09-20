var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListingsSchema = new Schema ({
  name: String,
  description: String,
  price: Number,
  availableFrom: Date,
  availableTo: Date,
  // user: {
  //   type: Schema.ObjectId,
  //   ref: 'users'
  // }
});

mongoose.model('listings', ListingsSchema);
