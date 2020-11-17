require('dotenv').config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const createError = require('http-errors');

const app = express();

// Middleware Setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// require database configuration
require('./configs/db.config');

// require CORS (Cross-Origin Resource Sharing)

app.use(
  cors({
      credentials: true,
      origin: ["http://localhost:3000", "blah.reactappdomain.com"],
  })
);

// Enable authentication using session + passport
require('./configs/session.config')(app);
require("./passport")(app);

// routes middleware
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/clients"));
app.use("/", require("./routes/invoice"));

// Catch missing routes and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
