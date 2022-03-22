const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
require("dotenv").config();

const User = require("../models/User");

const cookieExtractor = (req) => {
  let token = null;
  console.log(req);

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
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

//authenticated local strategy using username and password
passport.use(
  new localStrategy((email, password, done) => {
    console.log(email, password);
    User.findOne({ email }, (error, user) => {
      //error
      if (error) return done(error);
      //no user exists
      if (!user) return done(null, false);
      //compare passwords
      user.comparePassword(password, done);
    });
  })
);
