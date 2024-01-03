const express = require('express');
const passport = require('passport');
const session = require('express-session');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const homeRouter = require('./routes/home');

const passportSetup = require('./config/passport');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  }),
);

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Parse incoming requests with JSON payloads.
app.use(express.json({ limit: '10kb' }));

app.get('/', homeRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

// if none of the above routes matched
app.all('*', (req, res, next) => {
  next(`404 ${req.originalUrl} not found`);
});

// Global error Handling
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: 'something went wrong',
    error: err,
  });
});

module.exports = app;
