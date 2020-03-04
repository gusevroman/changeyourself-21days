const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/registration', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login })
  if (user) {
    console.log('Такой есть');
    res.json({ res: false })
  } else {
    await User.create({ login, password })
    res.json({ res: login })
  }
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login, password })
  if (user) {
    console.log('nashel');
    res.json({ res: login })
  } else {
    res.json({ res: false })
  }
});


module.exports = router;
