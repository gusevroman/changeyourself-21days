const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Method = require('../models/method');
const Target = require('../models/target');
const multer = require('multer');
const nodemailer = require("nodemailer");


const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: async (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    const { id } = req.params;
    const newFileName = id + fileName;
    cb(null, newFileName)
    console.log('fileName', fileName);
    await User.findByIdAndUpdate(id, { profileImg: newFileName })
  }
})

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

router.post('/user/profile/edit/img/:id', upload.single('profileImg'), async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const name = user.profileImg;
  res.json({name})
})

router.post('/registration', async (req, res) => {
  const { login, password, email } = req.body;
  const user = await User.findOne({ login });

  if (user) {
    res.json({ error: true })
  } else {
    const newUser = await User.create({ login, password, email })
    const { id } = newUser;
    res.json({ login, id })


    async function main() {
      let transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 587,
        secure: false,
        auth: {
          user: "days21go@yandex.ru",
          pass: '21DAYS'
        }
      });

      let info = await transporter.sendMail({

        from: '<days21go@yandex.ru>',
        to: newUser.email,
        subject: "Вы зарегистрированы! ",
        text: "Информация о записе",
        html: `<b>Здравствуйте! Вы были зарегистрированы.</b>`

      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    }

    main().catch(console.error);





  }





});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login, password })
  if (user) {
    const { login, id } = user;
    res.json({ login, id })
  } else {
    res.json({ error: true })
  }
});

router.get('/user/target/:id', async (req, res) => {
  const { id } = req.params;
  const target = await Target.findById(id)
  res.json({ target })
});

router.delete('/user/target/:id', async (req, res) => {
  const { id } = req.params;
  await Target.findByIdAndDelete(id)
});

router.post('/user/deleteAccount', async (req, res) => {
  await User.findByIdAndDelete(req.body.id);
});


router.post('/user/:login', async (req, res) => {
  const { login } = req.params;
  const user = await User.findOne({ login })
  const targets = await Target.find({ author: user._id });

  targets.map(async (target) => {
    if (new Date() > target.endDate && target.status === 'active') {
      let doneTasks = 0;
      target.actions.forEach(action => {
        action.status && doneTasks++;
      });
      const personts = ((doneTasks * 100) / target.actions.length).toFixed(0);
      let newStatus = ''
      if (personts > 80) {
        newStatus = 'completed'
      } else {
        newStatus = 'fallen'
      }
      target.status = newStatus;
      await Target.findByIdAndUpdate(target._id, { status: newStatus })
    }
    return target
  })
  res.json({ targets })
});

router.post('/user/profile/edit', async (req, res) => {
  const { login, name, about, email, tel, instagram } = req.body;
  console.log('req.body', req.body);
  await User.findOneAndUpdate({ login }, { name, about, email, tel, instagram });
  res.json({res:true})
})

router.post('/user/profile/:login', async (req, res) => {
  const { login } = req.params;
  const profile = await User.findOne({ login });
  return res.json(profile)
});



module.exports = router;
