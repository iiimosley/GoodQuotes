'use strict'

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");

const { register, login } = require("../controllers/authCtrl.js");

router.post("/register", register);
router.post("/login", login);
// router.post("/logout", logout);


// router.post('/login', function (req, res, next) {
//   console.log('hitting login')
//   passport.authenticate("local-signin", { session: false }, (err, user, info) => {
//     if (err || !user) {
//       return res.status(400).json({
//         message: 'Something is not right',
//         user: user
//       });
//     }
//     req.login(user, { session: false }, (err) => {
//       if (err) {
//         res.send(err);
//       }
//       const token = jwt.sign(user, 'keyboard_cat');
//       return res.json({ user, token });
//     });
//   })(req, res);
// });


// router.post('/register', (req, res, next) => {
//   console.log('user', req.body);
//   console.log("Trying to register new user");
//   passport.authenticate("local-signup", (err, user, msgObj) => {
//     console.log("Where are we? session.js", user);

//     if (err) {
//       return next(err);
//     }

//     if (!user) {
//       console.log("Error registering", msgObj.message);
//       res.status(409); //Conflict.  This code is debatable. Seems best suited to me.
//       res.json({ message: msgObj.message });
//     }

//     // Go ahead and login the new user once they are signed up
//     req.login(user, { session: false }, (err) => {
//       if (err) {
//         res.send(err);
//       }
//       const token = jwt.sign(user, 'keyboard_cat');
//       return res.json({ user, token });
//     });
//   })(req, res, next);
// });


module.exports = router;