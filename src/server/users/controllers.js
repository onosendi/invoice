const eah = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const knex = require('../core/db');
const { checkPassword, makePassword } = require('../core/hasher');
const status = require('../core/status');
const msg = require('../core/validatorMessages');

const updateLastLogin = async ({ userId }) => {
  await knex('user').where({ id: userId }).update({ lastLogin: new Date() });
};

exports.login = [
  body('username').trim(),

  eah(async (req, res) => {
    const { username, password } = req.body;
    const user = await knex('user')
      .select('id', 'isActive', 'password')
      .where({ username })
      .first();

    if (!user || !user.isActive || !checkPassword({ password, encoded: user.password })) {
      res.status(status.HTTP_401_UNAUTHORIZED).end();
      return;
    }

    await updateLastLogin({ userId: user.id });

    req.login(user, () => {});

    res.status(status.HTTP_200_OK).json({});
  }),
];

exports.logout = (req, res) => {
  req.logout();
  res.status(status.HTTP_200_OK).json({});
};

exports.register = [
  body('username')
    .notEmpty()
    .withMessage(msg.REQUIRED)
    .custom(async (value) => {
      const user = await knex('user').where({ username: value }).first();
      if (user) {
        throw new Error('A user with that username already exists');
      }
      return true;
    })
    .trim(),
  body('password').notEmpty().withMessage(msg.REQUIRED),
  body('passwordConfirm')
    .notEmpty()
    .withMessage(msg.REQUIRED)
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  eah(async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const userId = uuidv4();

      eah(await knex.transaction(async (trx) => {
        await knex('user').insert({
          id: userId,
          username,
          password: makePassword({ password }),
        }).transacting(trx);
        await knex('userSetting').insert({ userId }).transacting(trx);
      }));

      const user = await knex('user').where({ username }).first();
      req.login(user, () => {});

      res.status(status.HTTP_201_CREATED).json({});
    } else {
      const mappedErrors = errors.mapped();
      res.status(status.HTTP_400_BAD_REQUEST).json({ errors: mappedErrors });
    }
  }),
];

exports.settingsTheme = eah(async (req, res) => {
  const { theme } = req.body;
  const { id } = req.user;

  await knex('userSetting').where({ userId: id }).update({ theme });

  res.status(status.HTTP_204_NO_CONTENT).json({});
});
