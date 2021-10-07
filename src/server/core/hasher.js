const crypto = require('crypto');

const hashPbkdf2 = ({ password, salt }) => (
  crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'));

const genSalt = () => crypto.randomBytes(16).toString('hex');

const makePassword = ({ password, salt = null }) => {
  const s = salt || genSalt();
  const hash = hashPbkdf2({ password, salt: s });
  return `${s}$${hash}`;
};

const checkPassword = ({ password, encoded }) => {
  const [salt] = encoded.split('$');
  const hash = makePassword({ password, salt });
  return hash === encoded;
};

module.exports = {
  makePassword,
  checkPassword,
};
