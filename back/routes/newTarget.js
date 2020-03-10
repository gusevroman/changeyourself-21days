const express = require('express');
const Target = require('../models/target');
const router = express.Router();

router.get('/', async (req, res) => {
  const allTarget = await Target.find({});
  return res.json(allTarget)
});

router.post('/add', async (req, res) => {
  const { userId, method } = req.body
  console.log(userId);
  console.log(method);
  const newTarget = await new Target({
    category: method.category,
    status: "active",
    title: method.title,
    description: method.description,
    tag: method.tag,
    startDate: new Date(),
    endDate: new Date(),
    author: userId,
    method: method.method,
  })
  await newTarget.save()
});

module.exports = router;
