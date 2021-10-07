const passport = require('passport');

passport.serializeUser((user, done) => {
  done(null, { id: user.id });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

exports.passportInit = () => passport.initialize();

exports.passportSess = () => passport.session();
