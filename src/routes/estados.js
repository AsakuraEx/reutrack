const express = require('express');
var app = express.Router();
//const validate = require('../middlewares/schemaValidation');

//const estadoCreateSchema = require('../schema/estado/createSchema')
//const estadoUpdateSchema = require('../schema/estado/updateSchema')
const estadoController = require('../controllers/estadoController')

app.get('/getOne/:id',     estadoController.getOne)
app.get('/index',     estadoController.index)
app.post('/create',  estadoController.create)
//app.put('/update/:id',  validate(vetSpecialityUpdateSchema), vetSpecialityController.update)
//app.put('/enable/:id',  vetSpecialityController.enable)
//app.put('/disable/:id', vetSpecialityController.disable)

module.exports = app;