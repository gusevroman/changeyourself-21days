const mongoose = require("mongoose");

const targetSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: [String],
  tag: String,
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
  method: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Method',
  },
  actions: [],
});

targetSchema.statics.updateStatus = async function  (id, actionsId) {
  const doc = await this.findById(id)
// console.log(doc.actions);

  const aIndex = await doc.actions.findIndex( el =>  el._id==actionsId )
  console.log(aIndex);
console.log(doc.actions[aIndex].status);
  
 doc.actions[aIndex].status=true
console.log(doc.actions[aIndex].status);

  await doc.save()
}


module.exports = mongoose.model('Target', targetSchema);




