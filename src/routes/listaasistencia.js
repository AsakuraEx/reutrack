const express = require('express');
var app = express.Router();

const listaAsistenciaController = require('../controllers/listaasistenciaController')

app.get('/:id',     listaAsistenciaController.index)
app.post('/create',  listaAsistenciaController.create)
app.delete('/delete/:id', listaAsistenciaController.delete)

module.exports = app;