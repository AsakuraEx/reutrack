const express = require('express');
var app = express.Router();

const usuariosController = require('../controllers/usersController')

app.get('/',     usuariosController.index)
app.get('/:id',  usuariosController.getOne)
app.post('/create',  usuariosController.create)
app.patch('/:id', usuariosController.updatePassword)

module.exports = app;
