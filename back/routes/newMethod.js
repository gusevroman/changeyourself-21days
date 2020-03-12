const express = require('express');
const Method = require('../models/method');
const User = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
    let user = await User.findOne({login: req.body.author});
    let methodArr = [];
    req.body.days.forEach(elem => {
        methodArr.push(elem)
    });
    const newMethod = await Method.create({
        title: req.body.title.join(''),
        description: req.body.description.join(''),
        category: req.body.category,
        tag: req.body.tag.join(' ').split(' '),
        author: user._id,
        method: methodArr,
    });
    res.json({newMethod})
});


module.exports = router;
