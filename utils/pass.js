'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const {getUserLogin} = require('../models/userModel');

passport.use(
  new Strategy((username, password, done) => {
    // get user by username from getUserLogin
    const user = getUserLogin(username);
    // if user is undefined
    if (user === undefined) {
      return done(null, false);
    }
    // return done(null, false);
    // if passwords dont match
    if (user.password != password) {
      return done(null, false);
    }
    // return done(null, false);
    // if all is ok
    return done(null, user.id);
  })
);
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: '1234',
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload);
    }
  )
);

module.exports = passport;
