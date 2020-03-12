const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
    const user = await User.findByIdAndUpdate(
        { _id: req.body.userId },
        { checkEmail: req.body.value },
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
});


// ЕСЛИ ТРУ ТО УВЕДОМЛЕНИЯ ВЫКЛЮЧЕНЫ
module.exports = router;
