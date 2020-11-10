const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:123@cluster0.id5iu.mongodb.net/shop', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongo connected")
});

module.exports = db;