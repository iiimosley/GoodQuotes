'use strict';

const { Router } = require('express');
const router = Router();

const { addUserQuote, deleteUserQuote, addUserTag, checkQuote } = require("../controllers/userCtrl.js");

router.post('/user-quote', addUserQuote);

router.delete('/user-quote', deleteUserQuote);

router.post('/user-tag', addUserTag);

router.post('/quote-check', checkQuote);

module.exports = router;
