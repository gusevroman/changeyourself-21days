const mongoose = require("mongoose");
const Cathegory = require('../models/cathegory');

// DB connection
const DBConnection = require('../DBconnection');
DBConnection();


const cathegories = [
  {
    title: 'Philopher',
    questions: [
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 200,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 400,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 600,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 800,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 1000,
      }
    ]
  },

  {
    title: 'Agent 007',
    questions: [
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 200,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 400,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 600,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 800,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 1000,
      }
    ]
  },

  {
    title: 'Chess',
    questions: [
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 200,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 400,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 600,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 800,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 1000,
      }
    ]
  },

  {
    title: 'Space',
    questions: [
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 200,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 400,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 600,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 800,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 1000,
      }
    ]
  },

  {
    title: 'Nations',
    questions: [
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 200,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 400,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 600,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 800,
      },
      {
        question: 'Lorem ipsum',
        answer: 'Dolor',
        points: 1000,
      }
    ]
  }
]


Cathegory.insertMany(cathegories).then(() => {
  mongoose.connection.close()
});
