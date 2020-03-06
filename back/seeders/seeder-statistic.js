const mongoose = require("mongoose");
const User = require('../models/user');
const Target = require('../models/target');
const Method = require('../models/method');

// DB connection
const DBConnection = require('../DBconnection');
DBConnection();


let user1 = new User ({
  name: "Alexey",
  email: "alexey@mail.ru",
  login: 'Alex',
  password: 'alex',
  about: 'Я футболист, люблю кино',
  tel: '+7(999)123-23-54',
  instagram: "@alex-football",
});

let user2 = new User ({
  name: "Nikolay",
  email: "kolia@mail.ru",
  login: 'Nik',
  password: '111',
  about: 'Я дантист, люблю зубы и собак',
  tel: '+7(999)543-23-22',
  instagram: "@kolia-dantist",
})

let target1 = new Target({
  title: "Бросить курить",
  description: "Бросить курить за 21 день",
  category: "Здоровье",
  teg: "Курение",
  startDate: new Date( "03 01 2020" ),
  endDate: new Date( "03 22 2020" ),
  author: user1._id,
} )

let target2 = new Target({
  title: "Подтянись 25 раз",
  description: "Научится подтягиваться 25 раз за 3 недели",
  category: ["Здоровье", "Спорт"],
  teg: "Подтягивания",
  startDate: new Date( "02 05 2020" ),
  endDate: new Date( "02 26 2020" ),
  status: 'completed',
  author: user2._id,
} )

let target3 = new Target({
  title: "Бросить курить",
  description: "Бросить курить за 21 день",
  category: "Здоровье",
  teg: "Курение",
  startDate: new Date( "01 01 2020" ),
  endDate: new Date( "01 22 2020" ),
  status: 'active',
  author: user2._id,
} )


let method1 = new Method({
  title: "Бросить курить просто",
  description: "Приобрести 21 пачку сигарет по 20 сигарет в каждой. Приступаем!",
  category: ["Здоровье"],
  teg: "Курение",
  author: user2._id,
  followers: user1._id,
  method: [{
    title: "День 1",
    description: "Выкурить 20 сигарет",
    task: "Отдать 0 сигарет зависимому",
  },{
    title: "День 2",
    description: "Выкурить 19 сигарет",
    task: "Отдать 1 сигарет зависимому",
  },{
    title: "День 3",
    description: "Выкурить 18 сигарет",
    task: "Отдать 2 сигарет зависимому",
  },{
    title: "День 4",
    description: "Выкурить 17 сигарет",
    task: "Отдать 3 сигарет зависимому",
  },{
    title: "День 5",
    description: "Выкурить 16 сигарет",
    task: "Отдать 4 сигарет зависимому",
  },{
    title: "День 6",
    description: "Выкурить 15 сигарет",
    task: "Отдать 5 сигарет зависимому",
  },{
    title: "День 7",
    description: "Выкурить 14 сигарет",
    task: "Отдать 6 сигарет зависимому",
  },{
    title: "День 8",
    description: "Выкурить 13 сигарет",
    task: "Отдать 7 сигарет зависимому",
  },{
    title: "День 9",
    description: "Выкурить 12 сигарет",
    task: "Отдать 8 сигарет зависимому",
  },{
    title: "День 10",
    description: "Выкурить 11 сигарет",
    task: "Отдать 9 сигарет зависимому",
  },{
    title: "День 11",
    description: "Выкурить 10 сигарет",
    task: "Отдать 10 сигарет зависимому",
  },{
    title: "День 12",
    description: "Выкурить 9 сигарет",
    task: "Отдать 11 сигарет зависимому",
  },{
    title: "День 13",
    description: "Выкурить 8 сигарет",
    task: "Отдать 12 сигарет зависимому",
  },{
    title: "День 14",
    description: "Выкурить 7 сигарет",
    task: "Отдать 13 сигарет зависимому",
  },{
    title: "День 15",
    description: "Выкурить 6 сигарет",
    task: "Отдать 14 сигарет зависимому",
  },{
    title: "День 16",
    description: "Выкурить 5 сигарет",
    task: "Отдать 15 сигарет зависимому",
  },{
    title: "День 17",
    description: "Выкурить 4 сигарет",
    task: "Отдать 16 сигарет зависимому",
  },{
    title: "День 18",
    description: "Выкурить 3 сигарет",
    task: "Отдать 17 сигарет зависимому",
  },{
    title: "День 19",
    description: "Выкурить 2 сигарет",
    task: "Отдать 18 сигарет зависимому",
  },{
    title: "День 20",
    description: "Выкурить 1 сигарет",
    task: "Отдать 19 сигарет зависимому",
  },{
    title: "День 21",
    description: "Выкурить 0 сигарет",
    task: "Отдать 20 сигарет зависимому",
  }],
})

let method2 = new Method({
  title: "Подтянись 25 раз",
  description: "Подтянуться 25 и более раз может любой!",
  category: ["Здоровье", "Спорт"],
  teg: "Подтягивание",
  author: user1._id,
  followers: user2._id,
  method: [{
    title: "День 1",
    description: "Подтянись 1 раз",
    task: "Повтори 5 раз и более",
  },{
    title: "День 2",
    description: "Подтянись 2 раз",
    task: "Повтори 5 раз и более",
  },{
    title: "День 3",
    description: "Отдыхай и веселись!",
    task: "С утра до вечера",
  },{
    title: "День 4",
    description: "Подтянись 5 раз",
    task: "Повторить 5 раз и более",
  },{
    title: "День 5",
    description: "Отдыхай и веселись!",
    task: "С утра до вечера",
  },{
    title: "День 6",
    description: "Подтянись 7 раз",
    task: "Повторить 5 раз и более",
  },{
    title: "День 7",
    description: "Отдыхай и веселись!",
    task: "С утра до вечера",
  },{
    title: "День 8",
    description: "Подтянись 9 раз",
    task: "Повторить 5 раз и более",
  },{
    title: "День 9",
    description: "Отдыхай и веселись!",
    task: "С утра до вечера",
  },{
    title: "День 10",
    description: "Подтянись 13 раз",
    task: "Повторить 5 раз и более",
  },{
    title: "День 11",
    description: "Отдыхай и веселись!",
    task: "С утра до вечерау",
  },{
    title: "День 12",
    description: "Подтянись 15 раз",
    task: "Повторить 5 раз и более",
  },{
    title: "День 13",
    description: "Отдыхай и веселись!",
    task: "С утра до вечерау",
  },{
    title: "День 14",
    description: "Подтянись 17 раз",
    task: "Повторить 5 раз и более",
  },{
    title: "День 15",
    description: "Отдыхай и веселись!",
    task: "С утра до вечерау",
  },{
    title: "День 16",
    description: "Подтянись 19 раз",
    task: "Повторить 5 раз и более",
  },{
    title: "День 17",
    description: "Отдыхай и веселись!",
    task: "С утра до вечерау",
  },{
    title: "День 18",
    description: "Подтянись 21 раз",
    task: "Повторить 5 раз и более",
  },{
    title: "День 19",
    description: "Отдыхай и веселись!",
    task: "С утра до вечерау",
  },{
    title: "День 20",
    description: "Подтянись 23 раз",
    task: "Повторить 5 раз и более",
  },{
    title: "День 21",
    description: "Подтянись 25 раз",
    task: "Повторить 5 раз и более",
  }],
})


user2.targets = target1._id;
user1.targets = target2._id;

target1.method = method1._id;
target1.actions = method1.method;
target2.method = method2._id;
target2.actions = method2.method;
target3.method = method2._id;
target3.actions = method2.method;



user1.save();
user2.save();

target1.save();
target2.save();
target3.save();

method1.save();
method2.save();
