const mongoose = require("mongoose");

const methodSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: [String],
  teg: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  method: [{
    title: String,
    description: String,
    task: String,
    status: {
      type: Boolean,
      default: false,
    },
  }],
});
module.exports = mongoose.model('Method', methodSchema);
