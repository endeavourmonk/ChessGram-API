const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users');

passport.serializeUser((user, cb) => {
  console.log('serializing user:', user.id);
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      // If user already exist then serialize existing user
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) return cb(null, existingUser);

      // Else create new user and serialize
      const { name, email, picture, sub, email_verified, locale } =
        profile._json;

      const newUser = new User({
        name: name,
        email: email,
        googleId: sub,
        username: email.split('@')[0],
        profilePicture: picture,
      });
      // console.log(profile);
      try {
        await newUser.save();
        return cb(null, newUser); // serializing new user
      } catch (error) {
        console.error(error);
        return cb(error, null);
      }
    },
  ),
);
