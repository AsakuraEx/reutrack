const express = require('express');
var app = express.Router();

const minutaReunionController = require('../controllers/minutareunionController')

app.get('/:id_reunion',     minutaReunionController.index)
app.post('/create',  minutaReunionController.create)
app.patch('/update/:id', minutaReunionController.update)
app.delete('/delete', minutaReunionController.delete)

module.exports = app;