const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users');

passport.serializeUser((user, cb) => {
  console.log('serilization user: ', user.id);
  cb(null, { id: user.id });
});

passport.deserializeUser(async (serializedUser, cb) => {
  // Use the serialized user's id to find the user in your database
  try {
    const user = await User.findById(serializedUser.id);
    console.log('desierilization user: ', user);
    // If the user is found, pass it to the callback
    if (user) {
      return cb(null, user);
    }
    // If the user is not found, indicate deserialization failure
    return cb(null, false, { message: 'User not found.' });
  } catch (error) {
    return cb(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: 'https://chessgram-api.onrender.com/auth/google/callback',
      // callbackURL: '/auth/google/callback',
      callbackURL:
        process.env.NODE_ENV === 'development'
          ? '/auth/google/callback'
          : 'https://chessgram-api.onrender.com/auth/google/callback',
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
