const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  console.log('asdsadsad');
  
  try {
    const cathegoriesToSent = await Cathegory.find({});
    return res.json(cathegoriesToSent)
  } catch (e) {
    res.status(400).send('Some troubles')
  }
});

module.exports = router;
