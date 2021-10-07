exports.seed = async (knex) => {
  await knex('userSetting').del();

  const users = await knex('user').select('id');
  const data = users.reduce((a, c) => [...a, { userId: c.id }], []);

  return knex('userSetting').insert(data);
};
