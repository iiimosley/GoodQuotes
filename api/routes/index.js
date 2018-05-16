'use strict';

const { Router } = require('express');
const router = Router();

router.use(require('./author-route'));
router.use(require('./tag-route'));
router.use(require('./title-route'));
router.use(require('./auth-route'));
router.use(require('./smart-route'));

module.exports = router;