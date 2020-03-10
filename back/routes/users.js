const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Method = require('../models/method');
const Target = require('../models/target');

router.post('/registration', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login })
  if (user) {
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
    res.json({ res: login })
  } else {
    res.json({ res: false })
  }
});

router.get('/user/target/:id', async (req, res) => {
  const { id } = req.params;
  const target = await Target.findById({ _id: id })
  res.json({ target })

});

router.post('/user/:login', async (req, res) => {
  const { login } = req.params;
  const user = await User.findOne({ login })
  const targets = await Target.find({ author: user._id });

  targets.map(async (target) => {
    if (new Date() > target.endDate && target.status === 'active') {
      let doneTasks = 0;
      target.actions.forEach(action => {
        action.status && doneTasks++;
      });
      const personts = ((doneTasks * 100) / target.actions.length).toFixed(0);
      let newStatus = ''
      if (personts > 80) {
        newStatus = 'completed'
      } else {
        newStatus = 'fallen'
      }
      target.status = newStatus;
      await Target.findByIdAndUpdate(target._id, { status: newStatus })
    }
    return target
  })
  res.json({ targets })
});

router.post('/user/profile/edit', async (req, res) => {
  const { login, name, about, email, tel, instagram } = req.body;
  console.log('req.body', req.body);
  await User.findOneAndUpdate({ login }, { name, about, email, tel, instagram })
})

router.post('/user/profile/:login', async (req, res) => {
  const { login } = req.params;
  const profile = await User.findOne({ login });
  return res.json(profile)
});


module.exports = router;
