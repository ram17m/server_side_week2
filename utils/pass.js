'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const {getUserLogin} = require('../models/userModel');

passport.use(
  new Strategy((username, password, done) => {
    // get user by username from getUserLogin
    const user = getUserLogin(username);
    console.log(user);
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

module.exports = passport;
