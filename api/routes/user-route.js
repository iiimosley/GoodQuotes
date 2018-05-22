'use strict';

const { Router } = require('express');
const router = Router();

const { getUserQuotes, addUserQuote, deleteUserQuote, deleteUserQuoteById, addUserTag, checkQuote } = require("../controllers/userCtrl.js");

router.get('/user-quote/:uid', getUserQuotes);

router.post('/user-quote', addUserQuote);

router.delete('/user-quote', deleteUserQuote);

router.delete('/user-quote/:id', deleteUserQuoteById);

router.post('/user-tag', addUserTag);

router.post('/quote-check', checkQuote);

module.exports = router;
