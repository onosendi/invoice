exports.up = (knex) => (
  knex.schema.raw('create extension if not exists citext with schema public'));

exports.down = (knex) => (
  knex.schema.raw('drop extension if exists citext'));
