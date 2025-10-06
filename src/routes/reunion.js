const express = require('express');
var app = express.Router();

const reunionController = require('../controllers/reunionController');
const { verifyToken } = require('../middlewares/verifyToken');

app.get('/',[verifyToken] , reunionController.index);
app.get('/ultima', [verifyToken] ,reunionController.ultima);
app.post('/create', [verifyToken] ,reunionController.create);
app.get('/reactivadas', [verifyToken], reunionController.verReactivadas)
app.patch('/reactivar', [verifyToken] ,reunionController.reactivar);
app.patch('/cancelar/:id', [verifyToken] ,reunionController.cancelar);
app.patch('/finalizar/:id', [verifyToken] ,reunionController.finalizar);
app.get('/detalle/:id', [verifyToken] ,reunionController.detalle);
app.get('/pdf/:id', reunionController.generatePDF);
app.get('/reunion-actual/:codigo', reunionController.actual);

app.get('/:id', reunionController.getOne);

module.exports = app;

