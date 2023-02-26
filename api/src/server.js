var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');



// If you are adding a new route, you need to add it here
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var eventsRouter = require('./routes/events');
var societiesRouter = require('./routes/societies');
var purchaseRouter = require('./routes/purchase');
var swaggerDocument = require('./swagger.json');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



// If you are adding a new route, you need to add it here
app.use('/', indexRouter);
app.use('/user', loginRouter);
app.use('/events', eventsRouter);
app.use('/societies', societiesRouter);
app.use('/purchase', purchaseRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
});

module.exports = app;
