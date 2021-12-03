const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const session = require('express-session');
require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const clothingRouter = require('./routes/clothing');

// const history = require('connect-history-api-fallback');

// database
const cors = require('cors');
const db = require('./db/db_config');

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});


const app = express();

app.use(cors());

// Set up user session
// app.use(session({
//     secret: 'URL-shortener',
//     resave: true,
//     saveUninitialized: true
// }));

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, isProduction ? 'dist' : 'public')));

app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/clothing', clothingRouter);

// Catch all other routes into a meaningful error message
// can only go to these routes directly if not already on the website in current tab
app.all('*', (req, res) => {
    const errorMessage = `
      Cannot find the resource <b>${req.url}</b>
    `;
    res.status(404).send(errorMessage);
  });

module.exports = app;
