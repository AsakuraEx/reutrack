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

const origen = "https://reutrack.salud.gob.sv"

app.use(cors({
  origin: origen,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Accept-Language',
    'Accept-Encoding'
  ],
  exposedHeaders: ['Content-Disposition']
}));


//Encabezados y Proteccion
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('Content-Security-Policy', "frame-ancestors 'self'; default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none'; frame-src 'none';");
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Referrer-Policy', 'same-origin');
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
  next(createError(200));
});


app.use(function(err, req, res, next) {
  
  res.locals.message = 'Server'
  res.locals.error = 'Server'
  res.locals.title = 'Server'; 
  
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
