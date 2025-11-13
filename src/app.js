const fs = require('fs');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const apiRouter = require('./routes/api');
const { swaggerUi, swaggerDocs } = require('./docs/swagger/swagger');

var app = express();

<<<<<<< HEAD
=======
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

>>>>>>> cbee2de73b8d7f53c4aabbfb8a11f3d1f3bf5081
let origen = "";

if (process.env.NODE_ENV === "production") {
  origen = "https://reutrack.salud.gob.sv";
} else {
  origen = `http://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`;
}

<<<<<<< HEAD
=======



>>>>>>> cbee2de73b8d7f53c4aabbfb8a11f3d1f3bf5081
app.use(cors({
  origin: [origen],
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Encabezados y Proteccion
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('Content-Security-Policy', "frame-ancestors 'self'; default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none'; frame-src 'none';");
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Access-Control-Allow-Origin', origen); // o '*'
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Accept-Language, Accept-Encoding');
  res.header('Referrer-Policy', 'same-origin');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/documentos', (req, res, next) => {

  // Headers específicos para evitar ERR_BLOCKED_BY_ORB
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  res.header('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
}, express.static(path.join(__dirname, 'uploads/documentos')));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);

// Catch 404 (no encontrado)
app.use(function(req, res, next) {
  res.status(404).json({ error: 'Not Found' });
});

// Manejador de errores
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

const port = process.env.PORT;
const host = process.env.HOST

app.listen(port, host, () => {
  console.log(`RUNNING SERVER`);
});

module.exports = app;
