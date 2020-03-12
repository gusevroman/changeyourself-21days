const express = require('express');
const router = express.Router();
const Target = require('../models/target');

router.post('/status', async (req, res) => {
  const { id, day } = req.body;
  const doc = await Target.findById(id)
  const aIndex = await doc.actions.findIndex(el => el._id == day)
if(doc.actions[aIndex].status == true){
  doc.actions[aIndex].status = false
}else{
  doc.actions[aIndex].status = true
}
  doc.markModified('actions');
  await doc.save()
});



module.exports = router;
