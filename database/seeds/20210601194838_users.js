const { v4: uuidv4 } = require('uuid');

const { makePassword } = require('../../src/server/core/hasher');

const mp = () => makePassword({ password: 'testing' });

exports.seed = async (knex) => {
  await knex('user').del();
  return knex('user').insert([
    {
      id: uuidv4(),
      username: 'onosendi',
      password: mp(),
    },
    {
      id: uuidv4(),
      username: 'jim',
      password: mp(),
    },
    {
      id: uuidv4(),
      username: 'mike',
      password: mp(),
      isActive: false,
    },
  ]);
};
