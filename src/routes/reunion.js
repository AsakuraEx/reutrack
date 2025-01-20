const express = require('express');
var app = express.Router();

const reunionController = require('../controllers/reunionController')

app.get('/index',     reunionController.index)
app.post('/create',  reunionController.create)

module.exports = app;