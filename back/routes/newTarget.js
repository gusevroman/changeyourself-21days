const express = require('express');
const Target = require('../models/target');
const User = require('../models/user');
const router = express.Router();
const nodemailer = require("nodemailer");




router.get('/', async (req, res) => {
  const allTarget = await Target.find({});
  return res.json(allTarget)
});

router.post('/add', async (req, res) => {
  const { userId, method } = req.body
  let ourUser = await User.findById(userId);
  console.log('НАШ ЮЗЕР', ourUser.email);


  const newTarget = await new Target({
    category: method.category,
    status: "active",
    title: method.title,
    description: method.description,
    tag: method.tag,
    startDate: new Date(),
    endDate: new Date(),
    author: userId,
    method: method.method,
  });
  await newTarget.save();

  let allTargetsUser = await Target.find({
    author: userId
  });

  let allTitleTarget = allTargetsUser.filter(elem => elem.title !== undefined).map(elem => elem.title).join(', ');
  console.log('YFI VTN{JL', method);



  async function main() {
    let transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "days21go@yandex.ru", // generated ethereal user
        pass: '21DAYS' // generated ethereal password
      }
    });

    let info = await transporter.sendMail({
      from: '"НУ ЗДАРОВА 👻" <days21go@yandex.ru>', // sender address
      to: 'geroyan.artem@mail.ru', // list of receivers
      subject: "Вы записаны! ", // Subject line
      text: "Информация о записе", // plain text body
      html: `<b>Здравствуйте! Вы выбрали ${method.method.title}. Методика была добавлена.</b>
                                <p>Список методик: ${allTitleTarget} </p>`
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  }

  main().catch(console.error);

});

module.exports = router;
