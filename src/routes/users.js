const express = require('express');
var app = express.Router();

const usuariosController = require('../controllers/usersController')

app.get('/',     usuariosController.index)
app.post('/create',  usuariosController.create)

module.exports = app;
