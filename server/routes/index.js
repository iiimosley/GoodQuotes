'use strict';

const { Router } = require('express');
const router = Router();

router.use(require('./author-route'));
router.use(require('./tag-route'));
router.use(require('./title-route'));

module.exports = router;