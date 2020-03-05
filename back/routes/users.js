const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Method = require('../models/method');
const Target = require('../models/target');

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

router.post('/user/:login', async (req, res) => {
  const { login } = req.params;
  const user = await User.findOne({ login })
  const targets = await Target.find({author: user._id});
  res.json({targets})
});


module.exports = router;
