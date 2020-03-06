const express = require('express');
const Target = require('../models/target');
const router = express.Router();

router.get('/', async (req, res) => {
    const allTarget = await Target.find({});
    return res.json(allTarget)
});


module.exports = router;
