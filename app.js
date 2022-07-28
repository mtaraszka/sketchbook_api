const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.db, { 
    useUnifiedTopology: true,
    useNewUrlParser: true 
});

const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('connected with database');
})

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
