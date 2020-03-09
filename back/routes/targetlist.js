const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/status', async (req, res) => {
  // const { id } = req.body;
  console.log(req.body);
  
  // const user = await User.findOne({ login })
  // if (user) {
  //   res.json({ res: false })
  // } else {
  //   await User.create({ login, password })
  //   res.json({ res: login })
  // }
});



module.exports = router;
