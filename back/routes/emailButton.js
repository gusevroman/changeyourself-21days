const express = require('express');
const Method = require('../models/method');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body)

    // const takeTags = await Method.find({category: req.body.value});
    // return res.json(takeTags)
});


module.exports = router;
