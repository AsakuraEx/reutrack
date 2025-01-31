const express = require('express');
var app = express.Router();

const reunionController = require('../controllers/reunionController')
const { verifyToken } = require('../middlewares/verifyToken');

app.get('/',  reunionController.index)
app.get('/ultima', reunionController.ultima)
app.get('/:id',   reunionController.getOne)
app.post('/create',  reunionController.create)
app.patch('/delete/:id', reunionController.cancelar)
app.patch('/finalizar/:id',reunionController.finalizar)

app.get('/reunion-actual/:codigo', reunionController.actual)

module.exports = app;