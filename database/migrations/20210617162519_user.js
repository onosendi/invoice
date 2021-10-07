exports.up = (knex) => knex.schema.createTable('user', (t) => {
  t.uuid('id').primary();
  t.specificType('username', 'citext').notNullable().unique();
  t.string('password', 161).notNullable();
  t.boolean('isActive').defaultTo(true).notNullable();
  t.datetime('createdAt').defaultTo(knex.fn.now()).notNullable();
  t.datetime('lastLogin');
});

exports.down = (knex) => knex.schema.dropTableIfExists('user');
