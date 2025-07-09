const express = require('express');
var app = express.Router();

const proyectoController = require('../controllers/proyectoController')

app.get('/',     proyectoController.index)
app.get('/:id', proyectoController.getOne)
app.post('/create',  proyectoController.create)
app.patch('/update/:id', proyectoController.update)
app.patch('/cancelar/:id', proyectoController.cancelar)
app.patch('/finalizar/:id', proyectoController.finalizar)
app.delete('/delete', proyectoController.delete)

module.exports = app;