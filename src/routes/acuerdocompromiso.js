const express = require('express');
var app = express.Router();

const acuerdoController = require('../controllers/acuerdocompromisoController')

app.get('/:id_reunion',     acuerdoController.index)
app.post('/create',  acuerdoController.create)
app.delete('/delete', acuerdoController.delete)

module.exports = app;