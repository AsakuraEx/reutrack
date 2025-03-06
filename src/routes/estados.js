const express = require('express');
var app = express.Router();

const estadoController = require('../controllers/estadoController')

app.get('/getOne/:id',     estadoController.getOne)
app.get('/',     estadoController.index)
app.post('/create',  estadoController.create)


module.exports = app;