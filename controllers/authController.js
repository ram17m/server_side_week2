'use strict';
const {json} = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../utils/pass');

const login = (req, res) => {
  // TODO: add passport authenticate
  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log('login info', info);
    if (err || !user) {
      return res.send('err');
    }

    req.login(user, {session: false}, (err) => {
      if (err) {
        return res.send('err');
      }

      const token = jwt.sign(user, '1234');
      return res.json(token);
    });
  })(req, res);
};

module.exports = {
  login,
};
