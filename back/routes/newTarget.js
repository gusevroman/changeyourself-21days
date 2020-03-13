const express = require('express');
const Target = require('../models/target');
const User = require('../models/user');
const router = express.Router();
const nodemailer = require("nodemailer");
const Method = require('../models/method');


router.get('/', async (req, res) => {
    const allTarget = await Target.find({});
    return res.json(allTarget)
});

router.post('/add', async (req, res) => {
    const {userId, method} = req.body;
    let ourUser = await User.findById(userId);
    const newTarget = new Target({
        title: method.method.title,
        description: method.method.description,
        category: method.method.category,
        tag: method.method.tag[0],
        startDate: new Date(),
        endDate: new Date().setDate(new Date().getDate() + method.method.method.length),
        status: 'active',
        author: userId,
        actions: method.method.method

    });
    await newTarget.save();

    let allTargetsUser = await Target.find({
        author: userId
    });
    let allTitleTarget = allTargetsUser.filter(elem => elem.title !== undefined).map(elem => elem.title).join(', ');


    async function main() {
        let transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 587,
            secure: false,
            auth: {
                user: "go.21days@yandex.ru",
                pass: '89151004170'
            }
        });

        let info = await transporter.sendMail({

            from: '"НУ ЗДАРОВА 👻" <go.21days@yandex.ru>',
            to: ourUser.email,
            // subject: "Вы записаны! ",
            text: "Добавлена новая цель",

            html: `<b>Здравствуйте! Вы выбрали ${method.method.title}. Цель была добавлена.</b>
                                <p>Список ваших целей: ${allTitleTarget} </p>`
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    }

    if (ourUser.checkEmail === true) {
        main().catch(console.error);

    }


    res.json({res: true})
});

module.exports = router;
