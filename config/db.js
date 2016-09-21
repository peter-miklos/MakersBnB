var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/makers-bnb-' + process.env.NODE_ENV);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('successfull connection to makers-bnb-development db')
});
