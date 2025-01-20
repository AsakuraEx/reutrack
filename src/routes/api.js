const express = require('express');
var app = express.Router();

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
const estadoRouter = require('../routes/estados');
const proyectoRouter = require('../routes/proyecto');
const reunionRouter = require('../routes/reunion');
const encargadoRouter = require('../routes/encargado');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/estado', estadoRouter);
app.use('/proyectos', proyectoRouter);
app.use('/reuniones', reunionRouter);
app.use('/encargados', encargadoRouter);

module.exports = app