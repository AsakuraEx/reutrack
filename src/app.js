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
  methods: ['GET','POST','PUT','DELETE'],
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
  res.locals.title = 'Error'; // Added title for the error page

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT;
const host = process.env.HOST

app.listen(port, host, () => {
  console.log(`Servidor escuchando en http://${host}:${port}`);
});


module.exports = app;
