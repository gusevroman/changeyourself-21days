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
const cathegoriesRouter = require('./routes/cathegories');
const statisticRouter = require('./routes/statistic');


const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);
app.use('/cathegories', cathegoriesRouter);
app.use('/statistic', statisticRouter);

module.exports = app

