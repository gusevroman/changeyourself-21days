const express = require('express');
const Target = require('../models/target');
const router = express.Router();
const Method = require('../models/method');

router.get('/', async (req, res) => {
  const allTarget = await Target.find({});
  return res.json(allTarget)
});

router.post('/add', async (req, res) => {
  const { userId, method } = req.body
  const newTarget = new Target({
    title: method.method.title,
    description: method.method.description,
    category: method.method.category,
    tag: method.method.tag[0],
    startDate: new Date(),
    endDate: new Date().setDate(new Date().getDate()+method.method.method.length),
    status: 'active',
    author: userId,
    actions: method.method.method
  })
  await newTarget.save()
});

module.exports = router;
