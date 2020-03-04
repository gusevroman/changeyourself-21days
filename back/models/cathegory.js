const mongoose = require("mongoose");

const cathegorySchema = new mongoose.Schema({
  title: String,
  questions: [{
    question: String,
    answer: String,
    points: String,
  }]
});
module.exports = mongoose.model('Cathegory', cathegorySchema);




