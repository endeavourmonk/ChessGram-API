const express = require('express');
const passport = require('passport');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const { Server } = require('socket.io');
const session = require('express-session');
const { createServer } = require('node:http');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const roomRouter = require('./routes/room');
// const homeRouter = require('./routes/home');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error');

const passportSetup = require('./config/passport');

const app = express();
const server = createServer(app);
const io = new Server(server);

// securing req headers
app.use(helmet());

app.set('views', path.join(__dirname, 'views'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      // domain: 'chessgram-api.onrender.com',
      // path: '/',
      // sameSite: 'strict', // Allow cross-origin requests
    },
  }),
);

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Parse incoming requests with JSON payloads.
app.use(express.json({ limit: '10kb' }));

// Data sanitization NOSQL Queries
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] is sanitized`);
    },
  }),
);

// realtime socket connection
io.on('connection', (socket) => {
  // console.log('a user connected', socket);
  // Listen for 'joinRoom' events from the connected socket
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Listen for 'chatMessage' events from the connected socket within a specific room
  socket.on('chatMessage', (data) => {
    // Broadcast the received message to all sockets in the same room, including the sender
    io.to(data.room).emit('chatMessage', data);
  });

  // Handle socket disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// app.get('/', homeRouter);
app.get('/', (req, res, next) => {
  res.render('home');
});
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/room', roomRouter);

// if none of the above routes matched
app.all('*', (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found`));
});

// Global error Handling
app.use(globalErrorHandler);

server.listen(3000, () => {
  console.log(`💻 App running on 3000 🏃`);
});

module.exports = app;
