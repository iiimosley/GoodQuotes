'use strict'

const { Router } = require('express');
const router = Router();

const { register, login } = require("../controllers/authCtrl.js");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
