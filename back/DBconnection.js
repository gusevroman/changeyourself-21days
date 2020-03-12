const mongoose = require('mongoose');

function getConnection() {
  const db = "mongodb+srv://change:yourself@changeyourself-vyt2m.mongodb.net/21challengeTest?retryWrites=true&w=majority";

  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then(() => {
    console.log('Database 21challenge sucessfully connected')
  },
    error => {
      console.log('Database 21challenge could not be connected: ' + error)
    }
  );
}

module.exports = getConnection;

