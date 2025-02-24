const express = require('express');
var app = express.Router();

const reunionController = require('../controllers/reunionController');
const { verifyToken } = require('../middlewares/verifyToken');

app.get('/', reunionController.index);
app.get('/reunion-actual/:codigo', reunionController.actual);
app.get('/ultima', reunionController.ultima);
app.get('/detalle/:codigo', reunionController.detalle);
app.post('/create', reunionController.create);
app.patch('/cancelar/:id', reunionController.cancelar);
app.patch('/finalizar/:id', reunionController.finalizar);
app.get('/pdf/:id', reunionController.generatePDF);

app.get('/:id', reunionController.getOne);

module.exports = app;

