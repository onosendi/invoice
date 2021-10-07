exports.up = (knex) => knex.schema.createTable('invoice', (t) => {
  t.uuid('id').primary();
  t.string('invoiceId', 6);
  t.boolean('isActive').defaultTo(true).notNullable();
  t.datetime('createdAt').defaultTo(knex.fn.now()).notNullable();
  t.string('fromStreet');
  t.string('fromCity');
  t.string('fromPostCode');
  t.string('fromCountry');
  t.string('name');
  t.string('email');
  t.string('street');
  t.string('city');
  t.string('postCode');
  t.string('country');
  t.datetime('invoiceDate');
  t.enu('term', [1, 7, 14, 30]);
  t.text('description');
  t.enu('status', ['pending', 'draft', 'paid']).defaultTo('pending').notNullable();
  t
    .uuid('userId')
    .references('id')
    .inTable('user')
    .onDelete('CASCADE')
    .notNullable();

  t.unique(['invoiceId', 'userId']);
  t.index('invoiceId');
});

exports.down = (knex) => knex.schema.dropTableIfExists('invoice');
