const express = require('express');
const User = require('../models/user');
const Target = require('../models/target');
const router = express.Router();

router.post('/', async (req, res) => {
    const alltargetsUser = await Target.find({author: req.body.id});
    return res.json(alltargetsUser);

} );


module.exports = router;
