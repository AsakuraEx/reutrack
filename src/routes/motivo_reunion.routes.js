const express = require('express');
var app = express.Router();

const motivoController = require('../controllers/motivo_reunion.controller')

app.get('/getOne/:id',     motivoController.getOne)
app.get('/',     motivoController.index)


module.exports = app;