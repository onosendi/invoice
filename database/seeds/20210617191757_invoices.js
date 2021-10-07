const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

const genId = require('../../src/server/core/genInvoiceId');

const randomTerm = () => {
  const terms = [1, 7, 14, 30];
  return terms[Math.floor(Math.random() * terms.length)];
};

exports.seed = async (knex) => {
  await knex('invoice').del();

  const onosendi = await knex('user').select('id').where({ username: 'onosendi' }).first();

  return knex('invoice').insert([
    {
      id: uuidv4(),
      invoiceId: genId(),
      isActive: true,
      fromStreet: faker.address.streetAddress(),
      fromCity: faker.address.city(),
      fromPostCode: faker.address.zipCode(),
      fromCountry: faker.address.country(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      postCode: faker.address.zipCode(),
      country: faker.address.country(),
      invoiceDate: new Date(),
      term: randomTerm(),
      description: faker.lorem.sentence(),
      status: 'pending',
      userId: onosendi.id,
    },
    {
      id: uuidv4(),
      invoiceId: genId(),
      isActive: true,
      fromStreet: faker.address.streetAddress(),
      fromCity: faker.address.city(),
      fromPostCode: faker.address.zipCode(),
      fromCountry: faker.address.country(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      postCode: faker.address.zipCode(),
      country: faker.address.country(),
      invoiceDate: new Date(),
      term: randomTerm(),
      description: faker.lorem.sentence(),
      status: 'paid',
      userId: onosendi.id,
    },
    {
      id: uuidv4(),
      invoiceId: genId(),
      isActive: true,
      status: 'draft',
      userId: onosendi.id,
      name: faker.name.findName(),
      country: faker.address.country(),
    },
    {
      id: uuidv4(),
      invoiceId: genId(),
      isActive: true,
      status: 'draft',
      userId: onosendi.id,
    },
  ]);
};
