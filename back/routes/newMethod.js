const express = require('express');
const Method = require('../models/method');
const router = express.Router();

router.post('/', async (req, res) => {
    const newMethodObj = await req.body.value;
    let method1 = await Method.create({
        title: req.body.title,
        description: req.body.description,
        category: [String],
        tag: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        method: [{
            title: String,
            description: String,
            task: String,
            status: {
                type: Boolean,
                default: false,
            },
        }],
    });
    return res.json(takeTags)
});


module.exports = router;
