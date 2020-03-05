const mongoose = require("mongoose");

const targetSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: [String],
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    default: 'active'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
});
module.exports = mongoose.model('Target', targetSchema);




