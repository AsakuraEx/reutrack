const express = require('express');
var app = express.Router();

const encargadoController = require('../controllers/encargadoController')

app.get('/:id_reunion',     encargadoController.index)
app.post('/create',  encargadoController.create)
app.delete('/delete/:id', encargadoController.delete)

module.exports = app;