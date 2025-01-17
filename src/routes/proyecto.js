const express = require('express');
var app = express.Router();

const proyectoController = require('../controllers/proyectoController')

app.get('/index',     proyectoController.index)
app.post('/create',  proyectoController.create)

module.exports = app;