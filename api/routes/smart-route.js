'use strict';

const { Router } = require('express');
const router = Router();

const { getSmartQuote } = require('../controllers/smartCtrl');

router.post('/smart', getSmartQuote);

module.exports = router;