const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const statisticToSent = await Statistic.find({});
    return res.json(statisticToSent)
  } catch (e) {
    res.status(400).send('Some troubles')
  }
});



module.exports = router;
