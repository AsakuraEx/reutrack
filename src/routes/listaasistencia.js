const express = require('express');
var app = express.Router();

const listaAsistenciaController = require('../controllers/listaasistenciaController')
const { verifyToken } = require('../middlewares/verifyToken');

app.get('/:id',     listaAsistenciaController.index)
app.post('/create',  listaAsistenciaController.create)
app.delete('/delete/:id', verifyToken, listaAsistenciaController.delete)

module.exports = app;