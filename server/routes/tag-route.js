'use strict';

const { Router } = require('express');
const router = Router();

const { getTagQuotes } = require('../controllers/tagCtrl');

router.get('/tag/:tag', getTagQuotes);

module.exports = router;