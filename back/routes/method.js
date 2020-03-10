const express = require('express');
const Method = require('../models/method');
const router = express.Router();

router.post('/', async (req, res) => {
  const methods = await Method.find().sort({followers:-1}).limit(10);
  res.json(methods)
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

module.exports = router;
