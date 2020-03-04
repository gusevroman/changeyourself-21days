const mongoose = require("mongoose");

const statisticSchema = new mongoose.Schema({
  player: String,
  game: [{
    cathegory: String,
    points: Number
  }],
});
module.exports = mongoose.model('Statistic', statisticSchema);
