const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
require("dotenv").config();

const User = require("./models/User");

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookie) {
    token = req.cookie["access_token"];
  }

  return token;
};

//authorization
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.SECRET_JWT,
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (error, user) => {
        if (error) return done(error, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

//authenticated local strategy using username and password
passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({ username }, (error, user) => {
      //error
      if (error) return done(error);
      //no user exists
      if (!user) return done(null, false);
      //compare passwords
      user.comparePassword(password, done);
    });
  })
);
