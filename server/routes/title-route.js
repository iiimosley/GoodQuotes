'use strict';

const { Router } = require('express');
const router = Router();

const { getTitleQuotes } = require('../controllers/titleCtrl');

router.get('/title/:title', getTitleQuotes);

module.exports = router;