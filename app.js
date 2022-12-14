const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
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

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const userAssetsRoutes = require('./routes/userAssets');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/', userRoutes);
app.use('/', userAssetsRoutes);

module.exports = app;
