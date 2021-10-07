exports.up = (knex) => knex.schema.createTable('invoiceItem', (t) => {
  t.uuid('id').primary();
  t.string('name');
  t.integer('quantity').unsigned();
  t.decimal('price', 10, 2).unsigned();
  t
    .uuid('invoiceId')
    .unsigned()
    .references('id')
    .inTable('invoice')
    .onDelete('CASCADE')
    .notNullable();
});

exports.down = (knex) => knex.schema.dropTableIfExists('invoiceItem');
