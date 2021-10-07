const config = require('../../config');

module.exports = (req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken(), {
    sameSite: config.csrfCookie.sameSite,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
  });
  next();
};
