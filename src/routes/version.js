const express = require('express');
var app = express.Router();

const versionController = require('../controllers/versionController')

app.get('/',     versionController.getIniciado)
app.get('/version/:id', versionController.getOne)
app.post('/create',  versionController.create)
app.patch('/update/:id', versionController.update)
app.patch('/cancelar/:id', versionController.cancelar)
app.patch('/finalizar/:id', versionController.finalizar)

module.exports = app;