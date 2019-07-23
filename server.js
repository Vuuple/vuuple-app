require('babel-register')({
  presets: ['env']
});

const express = require('express');
const createError = require('http-errors');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
// const io = require('socket.io').listen(server);
// io.set("origins", "*:*");
const erebosRouter = require('./back-end/routes/erebos');

app.use('/', express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist', 'index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, x_auth, jwt',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
});
app.use('/api/v1/erebos', erebosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Example listening on port 3000!');
});

const forceSSL = function() {
  return function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  };
};
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());
module.exports = app;
