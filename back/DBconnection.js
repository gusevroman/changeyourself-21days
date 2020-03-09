const mongoose = require('mongoose');

function getConnection() {
  const db = "mongodb+srv://change:yourself@changeyourself-vyt2m.mongodb.net/21challenge?retryWrites=true&w=majority";

  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = getConnection;

