const csurf = require('csurf');
const express = require('express');
const nextApp = require('next');

const config = require('./config');
const csrf = require('./core/middleware/csrf');
const errors = require('./core/middleware/errors');
const { passportInit, passportSess } = require('./core/middleware/passport');
const session = require('./core/middleware/session');
const demoRouter = require('./demo/routes');
const invoicesRouter = require('./invoices/routes');
const usersRouter = require('./users/routes');

const dev = config.env !== 'production';
const app = nextApp({ dev });
const handle = app.getRequestHandler();

const init = async () => {
  await app.prepare();

  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(session);
  server.use(passportInit());
  server.use(passportSess());
  server.use(csurf());
  server.use(csrf);
  server.use(errors);

  server.use('/api', demoRouter);
  server.use('/api', invoicesRouter);
  server.use('/api', usersRouter);

  server.all('*', handle);

  server.listen(config.port, config.ip, (err) => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://${config.ip}:${config.port}`);
  });
};

init();
