const eah = require('express-async-handler');
const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

const knex = require('../core/db');
const genId = require('../core/genInvoiceId');
const { makePassword } = require('../core/hasher');
const status = require('../core/status');

const randomTerm = () => {
  const terms = [1, 7, 14, 30];
  return terms[Math.floor(Math.random() * terms.length)];
};

exports.demo = eah(async (req, res) => {
  const userId = uuidv4();
  const pendingInvoiceId = uuidv4();
  const paidInvoiceId = uuidv4();

  eah(await knex.transaction(async (trx) => {
    await knex('user').insert({
      id: userId,
      username: `demo@!@${userId}`,
      password: makePassword({ password: 'demo' }),
    }).transacting(trx);

    await knex('userSetting').insert({ userId }).transacting(trx);

    await knex('invoice').insert([
      {
        id: pendingInvoiceId,
        invoiceId: genId(),
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
        userId,
      },
      {
        id: paidInvoiceId,
        invoiceId: genId(),
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
        userId,
      },
      {
        id: uuidv4(),
        invoiceId: genId(),
        fromStreet: faker.address.streetAddress(),
        fromCountry: faker.address.country(),
        email: faker.internet.email(),
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        postCode: faker.address.zipCode(),
        invoiceDate: new Date(),
        term: randomTerm(),
        status: 'draft',
        userId,
      },
    ]).transacting(trx);

    await knex('invoiceItem').insert([
      {
        id: uuidv4(),
        name: faker.commerce.productName(),
        quantity: 1,
        price: faker.finance.amount(),
        invoiceId: pendingInvoiceId,
      },
      {
        id: uuidv4(),
        name: faker.commerce.productName(),
        quantity: 3,
        price: faker.finance.amount(),
        invoiceId: pendingInvoiceId,
      },
      {
        id: uuidv4(),
        name: faker.commerce.productName(),
        quantity: 2,
        price: faker.finance.amount(),
        invoiceId: paidInvoiceId,
      },
    ]).transacting(trx);
  }));

  const user = await knex('user').where({ id: userId }).first();

  req.login(user, () => {});

  res.status(status.HTTP_201_CREATED).end();
});
