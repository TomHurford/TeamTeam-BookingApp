const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

// If you are adding a new route, you need to add it here
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const eventsRouter = require('./routes/events');
const societiesRouter = require('./routes/societies');
const purchaseRouter = require('./routes/purchase');
const ticketsRouter = require('./routes/tickets');
// const imageRouter = require('./routes/image');
const swaggerDocument = require('./swagger.json');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);

// If you are adding a new route, you need to add it here
app.use('/', indexRouter);
app.use('/user', loginRouter);
app.use('/events', eventsRouter);
app.use('/societies', societiesRouter);
app.use('/tickets', ticketsRouter);
app.use('/purchase', purchaseRouter);
// app.use('/image', imageRouter);
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
