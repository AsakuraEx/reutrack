const express = require('express');
var app = express.Router();

const puntoReunionController = require('../controllers/puntoreunionController')

app.get('/:id_reunion',     puntoReunionController.index)
app.post('/create',  puntoReunionController.create)
app.delete('/delete/:id', puntoReunionController.delete)

module.exports = app;