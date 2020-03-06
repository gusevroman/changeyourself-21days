const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    login: String,
    password: String,
    about: String,
    tel: String,
    instagram: String,
    targets: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Target'
    },
});

module.exports = mongoose.model('User', userSchema);
