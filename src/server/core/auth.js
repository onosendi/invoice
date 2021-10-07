const status = require('./status');

exports.needsLogin = (req, res, next) => {
  if (!req.session.passport?.user.id) {
    res.status(status.HTTP_403_FORBIDDEN).end();
    return;
  }
  next();
};
