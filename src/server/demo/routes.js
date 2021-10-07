const express = require('express');

const controllers = require('./controllers');

const router = express.Router();

router.route('/demo').post(controllers.demo);

router.post('/csrftest', (req, res) => {
  res.send(200).json({});
});

module.exports = router;
