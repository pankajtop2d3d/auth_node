var mongoose = require('mongoose');
//DB CONNECTION
mongoose.connect('mongodb://localhost:27017/bajaj_finserv', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});