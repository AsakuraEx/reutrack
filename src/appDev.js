var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const apiRouter = require('./routes/api')

var app = express();

app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  exposedHeaders: ['Content-Range', 'X-Total-Count']
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 10000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.title = 'Error'; 
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.DEV_PORT || 3001;
const host = process.env.DEV_HOST || 'localhost'

app.listen(port, host, () => {
  console.log(`Servidor DEV escuchando en http://${host}:${port}`);
});

module.exports = app;
