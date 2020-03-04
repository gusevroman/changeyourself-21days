const mongoose = require("mongoose");
const Statistic = require('../models/statistic');

// DB connection
const DBConnection = require('../DBconnection');
DBConnection();


const statistic = [
  {
    player: 'as78dta8s7dta8sd8a7sd',
    game: [
      {
        cathegory: "Philosopher",
        points: 800
      },
      {
        cathegory: "Agent 007",
        points: 1200
      },
      {
        cathegory: "Nations",
        points: 1600
      },
      {
        cathegory: "Languages",
        points: 900
      },
      {
        cathegory: "World",
        points: 2000
      },

    ],
  }
]


Statistic.insertMany(statistic).then(() => {
  mongoose.connection.close()
});
