const express = require('express');
var app = express.Router();


const usuariosController = require('../controllers/usersController')


app.get('/',     usuariosController.index)

app.post('/create',  usuariosController.create)

app.patch('/updatepassword', usuariosController.updatePassword)
app.patch('/updateStatus', usuariosController.status)

app.patch('/:id', usuariosController.update)
app.get('/:id',  usuariosController.getOne)
 
module.exports = app;
