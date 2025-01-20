const express = require('express');
var app = express.Router();

const encargadoController = require('../controllers/encargadoController')

app.get('/getOne/:id',     encargadoController.getOne)
app.get('/index',     encargadoController.index)
app.post('/create',  encargadoController.create)
app.delete('/delete', encargadoController.delete)

module.exports = app;