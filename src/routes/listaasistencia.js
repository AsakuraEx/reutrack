const express = require('express');
var app = express.Router();

const listaAsistenciaController = require('../controllers/listaasistenciaController')

app.get('/:id_reunion',     listaAsistenciaController.index)
app.post('/create',  listaAsistenciaController.create)
app.delete('/delete', listaAsistenciaController.delete)

module.exports = app;