const express = require('express');
var app = express.Router();

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
const estadoRouter = require('../routes/estados');
const proyectoRouter = require('../routes/proyecto');
const reunionRouter = require('../routes/reunion');
const encargadoRouter = require('../routes/encargado');
const acuerdoCompromisoRouter = require('../routes/acuerdocompromiso');
const listaAsistenciaRouter = require('../routes/listaasistencia')
const minutaReunionRouter = require('../routes/minutareunion')
const puntoreunionRouter = require('../routes/puntoreunion')
const versionRouter = require('../routes/version')
const authRouter = require('../routes/auth');
const { verifyToken } = require('../middlewares/verifyToken');

app.use('/',indexRouter);
app.use('/usuarios', usersRouter);
app.use('/estado', estadoRouter);
app.use('/proyectos', proyectoRouter);
app.use('/reuniones', reunionRouter);
app.use('/encargados', encargadoRouter);
app.use('/acuerdocompromiso',acuerdoCompromisoRouter)
app.use('/asistencia', listaAsistenciaRouter)
app.use('/minutareunion', minutaReunionRouter)
app.use('/puntoreunion', puntoreunionRouter)
app.use('/auth', authRouter)
app.use('/version', versionRouter)

module.exports = app