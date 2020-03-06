const express = require('express');
const Method = require('../models/method');
const router = express.Router();

router.post('/', async (req, res) => {
    const takeTags = await Method.find({category: req.body.value});
    return res.json(takeTags)
});


module.exports = router;
