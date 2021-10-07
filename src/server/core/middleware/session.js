const sessionKnex = require('connect-session-knex');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const config = require('../../config');
const knex = require('../db');

const KnexSessionStore = sessionKnex(session);

module.exports = session({
  cookie: {
    sameSite: config.session.cookie.sameSite,
    secure: config.session.cookie.secure,
  },
  genid: () => uuidv4(),
  name: config.session.name,
  resave: config.session.resave,
  saveUninitialized: config.session.saveUninitialized,
  secret: config.secret,
  store: new KnexSessionStore({
    knex,
    tablename: 'session',
  }),
});

// module.exports = (req, res, next) => {
//   // Next sends a bunch of requests on every page load. Each time a request
//   // is sent, the database gets hit requesting session data. Let's try to
//   // limit how much the database gets hit on every request.
//   const { path } = req;
//   if (/^[a-zA-Z0-9/-]+$/.test(path)) {
//     sess(req, res, next);
//   } else {
//     next();
//   }
// };
