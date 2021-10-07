const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

exports.seed = async (knex) => {
  await knex('invoiceItem').del();

  const onosendi = await knex('user').select('id').where({ username: 'onosendi' }).first();
  const invoice = await knex('invoice').select('id').where({ userId: onosendi.id }).first();
  const invoiceDraft = await knex('invoice')
    .select('id')
    .where({ userId: onosendi.id, status: 'draft' })
    .first();

  return knex('invoiceItem').insert([
    {
      id: uuidv4(),
      name: faker.commerce.productName(),
      quantity: 1,
      price: faker.finance.amount(),
      invoiceId: invoice.id,
    },
    {
      id: uuidv4(),
      name: faker.commerce.productName(),
      quantity: 3,
      price: faker.finance.amount(),
      invoiceId: invoice.id,
    },
    {
      id: uuidv4(),
      name: faker.commerce.productName(),
      quantity: 2,
      price: faker.finance.amount(),
      invoiceId: invoice.id,
    },
    {
      id: uuidv4(),
      name: faker.commerce.productName(),
      quantity: 1,
      price: faker.finance.amount(),
      invoiceId: invoiceDraft.id,
    },
    {
      id: uuidv4(),
      name: faker.commerce.productName(),
      price: faker.finance.amount(),
      invoiceId: invoiceDraft.id,
    },
  ]);
};
