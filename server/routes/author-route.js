'use strict';

const { Router } = require('express');
const router = Router();

const { getAuthorQuotes } = require('../controllers/authorCtrl');

router.get('/author/:name', getAuthorQuotes);

module.exports = router;