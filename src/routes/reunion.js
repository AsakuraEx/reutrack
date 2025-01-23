const express = require('express');
var app = express.Router();

const reunionController = require('../controllers/reunionController')

app.get('/',     reunionController.index)
app.get('/:id', reunionController.getOne)
app.post('/create',  reunionController.create)
app.patch('/:id', reunionController.cancelar)

module.exports = app;