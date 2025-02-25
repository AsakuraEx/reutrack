const express = require('express');
var app = express.Router();

const reunionController = require('../controllers/reunionController');
const { verifyToken } = require('../middlewares/verifyToken');

app.get('/',verifyToken , reunionController.index);
app.get('/reunion-actual/:codigo', reunionController.actual);
app.get('/ultima', verifyToken ,reunionController.ultima);
app.get('/detalle/:codigo', verifyToken ,reunionController.detalle);
app.post('/create', verifyToken ,reunionController.create);
app.patch('/cancelar/:id', verifyToken ,reunionController.cancelar);
app.patch('/finalizar/:id', verifyToken ,reunionController.finalizar);
app.get('/pdf/:id', verifyToken, reunionController.generatePDF);

app.get('/:id', reunionController.getOne);

module.exports = app;

