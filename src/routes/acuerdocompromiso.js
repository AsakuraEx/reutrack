const express = require('express');
var app = express.Router();

const acuerdoController = require('../controllers/acuerdocompromisoController')
const schemaValidator = require('../middlewares/schemaValidator')
const createSchema = require('../schema/acuerdocompromiso/createSchema')

app.get('/:id_reunion',acuerdoController.index)
app.post('/create',  acuerdoController.create)
app.delete('/delete/:id', acuerdoController.delete)

module.exports = app;