// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

// Connectin DB

const DBconnection = require('./DBconnection');
DBconnection();

const usersRouter = require('./routes/users');
const methodRouter = require('./routes/method');
const newTargetRouter = require('./routes/newTarget');
const getTagsRouter = require('./routes/getTags');
const targetListRouter = require('./routes/targetlist');
const newMethodRouter = require('./routes/newMethod');
const chartRouter = require('./routes/chart');
const emailButtonRouter = require('./routes/emailButton');



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);
app.use('/method', methodRouter);
app.use('/newTarget', newTargetRouter);
app.use('/getTags', getTagsRouter);
app.use('/targetlist', targetListRouter);
app.use('/newMethod', newMethodRouter);
app.use('/chart', chartRouter);
app.use('/emailButton', emailButtonRouter);



app.use('/public/', express.static('public'));

app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
      next(new Error('Something went wrong'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});


module.exports = app;


module.exports = app;
