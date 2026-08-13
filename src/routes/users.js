const express = require('express');
var app = express.Router();
const { verifyToken } = require('../middlewares/verifyToken');
const verifyApiKey = require('../middlewares/verifyApiKey');

const usuariosController = require('../controllers/usersController')

app.get('/', [verifyToken], usuariosController.index)
app.post('/create', [verifyToken], usuariosController.create)
app.patch('/updatepassword', usuariosController.updatePassword)
app.patch('/updateStatus', [verifyToken], usuariosController.status)
app.get('/cargos', [verifyToken], usuariosController.findCargos)
app.get('/usuariosApi', [verifyApiKey], usuariosController.indexApi);
app.patch('/:id', [verifyToken], usuariosController.update)
app.get('/:id', [verifyToken],  usuariosController.getOne)

app.use(verifyApiKey);

module.exports = app;
