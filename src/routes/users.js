const express = require('express');
var app = express.Router();

const usuariosController = require('../controllers/usersController')

app.get('/',     usuariosController.index)
app.get('/:id',  usuariosController.getOne)

app.post('/create',  usuariosController.create)

app.patch('/updatepassword', usuariosController.updatePassword)
app.patch('/updateStatus', usuariosController.status)
app.patch('/:id', usuariosController.update)

module.exports = app;
