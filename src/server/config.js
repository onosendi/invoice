require('dotenv').config();
const convict = require('convict');
const path = require('path');
const pg = require('pg');

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => Number(value));

const config = convict({
  appName: {
    doc: 'Name of this application',
    default: 'Somebody didn\'t set me',
    env: 'NEXT_PUBLIC_APP_NAME',
    format: String,
  },
  database: {
    client: 'pg',
    connection: {
      database: {
        doc: 'Database name',
        default: '',
        env: 'DB_NAME',
        format: String,
        sensitive: true,
      },
      host: {
        doc: 'Database host',
        default: 'localhost',
        env: 'DB_HOST',
        format: '*',
      },
      password: {
        doc: 'Database password',
        default: '',
        env: 'DB_PASSWORD',
        format: String,
        sensitive: true,
      },
      port: {
        doc: 'Database port',
        default: 5432,
        env: 'DB_PORT',
        format: 'port',
      },
      user: {
        doc: 'Database username',
        default: '',
        env: 'DB_USER',
        format: String,
        sensitive: true,
      },
    },
    debug: {
      doc: 'Print queries to stdout',
      default: false,
      env: 'DB_DEBUG',
      format: Boolean,
    },
    migrations: {
      directory: path.resolve(__dirname, '../../database/migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, '../../database/seeds'),
    },
  },
  env: {
    doc: 'The application environment',
    default: 'development',
    env: 'NODE_ENV',
    format: ['production', 'development', 'test'],
  },
  ip: {
    doc: 'The IP address to bind the server to',
    default: 'localhost',
    env: 'APP_IP',
    format: '*',
  },
  port: {
    doc: 'The port to bind the server to',
    default: 3000,
    env: 'APP_PORT',
    format: 'port',
  },
  secret: {
    doc: 'Secret used for session cookies and CSRF tokens',
    default: '',
    env: 'APP_SECRET',
    format: '*',
    sensitive: true,
  },
  session: {
    cookie: {
      sameSite: {
        doc: 'SameSite Set-Cookie attribute',
        default: 'lax',
        env: 'SESSION_COOKIE_SAME_SITE',
        format: '*',
      },
      secure: {
        doc: 'Secure Set-Cookie attribute',
        default: 'auto',
        env: 'SESSION_COOKIE_SECURE',
        format: '*',
      },
    },
    name: {
      doc: 'Name of session cookie',
      default: 'sessionid',
      env: 'SESSION_NAME',
      format: String,
    },
    resave: {
      doc: 'Forces the session to be saved back to the store when unchanged',
      default: false,
      env: 'SESSION_RESAVE',
      format: Boolean,
    },
    saveUninitialized: {
      doc: 'Forces a session that is "uninitialized" to be saved to the store',
      default: false,
      env: 'SESSION_SAVE_UNINITIALIZED',
      format: Boolean,
    },
  },
  csrfCookie: {
    sameSite: {
      doc: 'SameSite Set-Cookie attribute',
      default: 'lax',
      env: 'CSRF_COOKIE_SAME_SITE',
      format: '*',
    },
  },
});

config.validate({ allowed: 'strict' });

module.exports = config.getProperties();
