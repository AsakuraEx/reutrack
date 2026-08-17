const express = require('express');
var app = express.Router();

const reunionController = require('../controllers/reunionController');
const { verifyToken } = require('../middlewares/verifyToken');

app.post('/email_pdf', reunionController.emailPDF);

app.get('/',[verifyToken] , reunionController.index);
app.get('/ultima', [verifyToken] ,reunionController.ultima);
app.post('/pdf', reunionController.generatePDF);
app.get('/reactivadas', [verifyToken], reunionController.verReactivadas)
app.get('/motivo', [verifyToken], reunionController.motivo)
app.post('/create', [verifyToken] ,reunionController.create);

app.post('/aceptarReunion', [verifyToken], reunionController.aceptarReunionCompartida);
app.post('/rechazarReunion', [verifyToken], reunionController.rechazarReunionCompartida);
app.get('/reuniones-recibidas', [verifyToken], reunionController.mostrarReunionesCompartidas);

app.patch('/reprogramar', [verifyToken] ,reunionController.reprogramar);
app.get('/reunion-version', [verifyToken], reunionController.reunionPorVersion)

app.patch('/reactivar', [verifyToken] ,reunionController.reactivar);
app.patch('/iniciar/:id', [verifyToken], reunionController.iniciar);
app.patch('/cancelar', [verifyToken] ,reunionController.cancelar);
app.patch('/finalizar/:id', [verifyToken] ,reunionController.finalizar);
app.get('/detalle/:id', [verifyToken] ,reunionController.detalle);

app.get('/reunion-actual/:codigo', reunionController.actual);

app.get('/:id', reunionController.getOne);

module.exports = app;

