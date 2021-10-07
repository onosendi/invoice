const knex = require('../core/db');

exports.knexSelectUser = ({ id }) => knex('user as u')
  .select('u.username', 'us.theme')
  .join('userSetting as us', 'us.userId', '=', 'u.id')
  .where({ id })
  .first();
