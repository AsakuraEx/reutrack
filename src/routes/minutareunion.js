const express = require('express');
var app = express.Router();

const minutaReunionController = require('../controllers/minutareunionController')

app.post('/create',  minutaReunionController.create)
app.patch('/update/:id_reunion', minutaReunionController.update)
app.delete('/delete', minutaReunionController.delete)

app.get('/:id_reunion',     minutaReunionController.index)


module.exports = app;