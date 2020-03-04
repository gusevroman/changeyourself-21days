const mongoose = require('mongoose');

function getConnection() {
  const db = "mongodb://localhost/mygame";

  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = getConnection;
