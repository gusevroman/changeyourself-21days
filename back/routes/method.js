const express = require('express');
const Method = require('../models/method');
const router = express.Router();

router.post('/', async (req, res) => {
  const methods = await Method.find();
  res.json(methods)
});

router.post('/top', async (req, res) => {
  const methods = await Method.find().sort({followers:-1}).limit(10);
  res.json(methods)
});

router.post('/getmethods', async (req, res) => {
  const { tag } = req.body
  const methods = await Method.find({tag:tag});
  res.json({methods})
});

router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const method = await Method.findById(id);
  res.json({method})
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Method.findByIdAndDelete(id);
});
router.post('/score/:id', async (req, res) => {
  const { id } = req.params;
  const {userId} = req.body;
  const {score} = req.body;
  const newScore = {
    author: userId,
    score
  }
  const method = await Method.findById(id);
  method.followers.push(newScore);
  method.save();
  res.json({method})
});
module.exports = router;
