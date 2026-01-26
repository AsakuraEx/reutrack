const express = require('express');
var app = express.Router();

const proyectoController = require('../controllers/proyectoController')

app.get('/',     proyectoController.index)
app.get('/versiones', proyectoController.indexWithVersion)
app.get('/eliminados', proyectoController.eliminados)
app.delete('/delete', proyectoController.delete)
app.post('/create',  proyectoController.create)
app.post('/fusion', proyectoController.fusion)
app.patch('/update/:id', proyectoController.update)
app.patch('/cancelar/:id', proyectoController.cancelar)
app.patch('/finalizar/:id', proyectoController.finalizar)
app.get('/:id', proyectoController.getOne)

module.exports = app;