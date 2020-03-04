const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);
