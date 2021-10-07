const express = require('express');

const { needsLogin } = require('../core/auth');
const controllers = require('./controllers');

const router = express.Router();

router.post('/users/login', controllers.login);

router.post('/users/logout', controllers.logout);

router.post('/users/register', controllers.register);

router.patch('/users/settings/theme', needsLogin, controllers.settingsTheme);

module.exports = router;
