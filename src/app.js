var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const apiRouter = require('./routes/api');
const { swaggerUi, swaggerDocs } = require('./docs/swagger/swagger');

var app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const origen = `http://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`

app.use(cors({
  origin: origen,
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  credentials: true
}));

//Encabezados y Proteccion
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.removeHeader('Access-Control-Allow-Origin');
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('Content-Security-Policy', "frame-ancestors 'self'; default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none'; frame-src 'none';");
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Referrer-Policy', 'same-origin');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Accept-Language, Accept-Encoding');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.title = 'Error'; // Added title for the error page
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.BACKEND_PORT;
const host = process.env.BACKEND_HOST

app.listen(port, host, () => {
  console.log(`Servidor escuchando en http://${host}:${port}`);
});

module.exports = app;
