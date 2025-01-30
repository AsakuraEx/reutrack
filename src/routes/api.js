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

app.use('/auth', authRouter),
app.use('/',[verifyToken],indexRouter);
app.use('/usuarios',[verifyToken], usersRouter);
app.use('/estado', [verifyToken], estadoRouter);
app.use('/proyectos', [verifyToken],proyectoRouter);
app.use('/reuniones', [verifyToken],reunionRouter);
app.use('/encargados', [verifyToken], encargadoRouter);
app.use('/acuerdocompromiso',[verifyToken],acuerdoCompromisoRouter)
app.use('/asistencia', [verifyToken], listaAsistenciaRouter)
app.use('/minutareunion', [verifyToken], minutaReunionRouter)
app.use('/puntoreunion', [verifyToken], puntoreunionRouter)
app.use('/versiones', [verifyToken], versionRouter);


module.exports = app