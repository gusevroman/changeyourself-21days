const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    login: String,
    password: String,
    about: String,
    tel: String,
    instagram: String,
    profileImg: String,
});

module.exports = mongoose.model('User', userSchema);
