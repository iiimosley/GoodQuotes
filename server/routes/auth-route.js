'use strict';

const { Router } = require('express');
const router = Router();

const { register, login, logout } = require("../controllers/authCtrl");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() && (req.user)) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;