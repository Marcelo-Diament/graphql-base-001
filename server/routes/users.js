const express = require('express'),
  router = express.Router(),
  controller = require('../controllers/users')

router.get('/', controller.index)

module.exports = router
