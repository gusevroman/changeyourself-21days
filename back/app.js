const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Connectin DB

const DBconnection = require('./DBconnection');
DBconnection();

const usersRouter = require('./routes/users');
const methodRouter = require('./routes/method');
const newTargetRouter = require('./routes/newTarget');
const getTagsRouter = require('./routes/getTags');


const app = express();

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

module.exports = app


module.exports = app;
