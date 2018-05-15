'use strict'

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");

router.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, 'your_jwt_secret');
      return res.json({ user, token });
    });
  })(req, res);
});


//past routing

// 'use strict';

// const { Router } = require('express');
// const router = Router();

// const { register, login, logout } = require("../controllers/authCtrl");




// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated() && (req.user)) {
//     return next();
//   } else {
//     res.redirect('/login');
//   }
// }

module.exports = router;