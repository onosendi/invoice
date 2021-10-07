exports.up = (knex) => knex.schema.createTable('userSetting', (t) => {
  t.enu('theme', ['light', 'dark']).defaultTo('dark').notNullable();
  t
    .uuid('userId')
    .references('id')
    .inTable('user')
    .onDelete('CASCADE')
    .notNullable();
});

exports.down = (knex) => knex.schema.dropTableIfExists('userSetting');
