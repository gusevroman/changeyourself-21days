const express = require('express');
const Method = require('../models/method');
const router = express.Router();

router.post('/', async (req, res) => {
    const methods = await Method.find().sort({followers:-1}).limit(10);
    return res.json(methods)
});


module.exports = router;
