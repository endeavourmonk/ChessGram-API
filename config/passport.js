const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      //   User.findOrCreate({ googleId: profile.id }, (err, user) => cb(err, user));
      console.log('fired callback fn, profile');

      const { name, email, picture, email_verified, locale } = profile._json;
      const newUser = new User({
        name: name,
        email: email,
        username: email.split('@')[0],
        profilePicture: picture,
      });

      await newUser.save();
      return cb(null, profile);
    },
  ),
);
