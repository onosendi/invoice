const knex = require('../core/db');

exports.knexSelectInvoices = ({ id, filter }) => {
  let invoices = knex('invoice')
    .select(
      'invoice.invoiceId',
      'invoice.name',
      knex.raw('extract(epoch from "invoice"."invoiceDate") as "invoiceDate"'),
      'invoice.term',
      'invoice.status',
      'invoiceItem.items',
    )
    .leftJoin(
      knex('invoiceItem as ii0')
        .select('invoiceId', knex.raw('json_agg(ii0) as items'))
        .groupBy('invoiceId')
        .as('invoiceItem'),
      'invoiceItem.invoiceId',
      '=',
      'invoice.id',
    )
    .where({ userId: id, isActive: true })
    .orderBy('invoice.createdAt', 'desc');

  if (filter?.length) {
    invoices = invoices.whereIn('status', filter);
  }

  return invoices;
};

exports.knexSelectInvoiceDetail = ({ userId, invoiceId }) => knex('invoice')
  .select(
    'invoice.invoiceId',
    'invoice.fromStreet',
    'invoice.fromCity',
    'invoice.fromPostCode',
    'invoice.fromCountry',
    'invoice.name',
    'invoice.email',
    'invoice.street',
    'invoice.city',
    'invoice.postCode',
    'invoice.country',
    knex.raw('extract(epoch from "invoice"."invoiceDate") as "invoiceDate"'),
    'invoice.term',
    'invoice.description',
    'invoice.status',
    'invoiceItem.items',
  )
  .leftJoin(
    knex('invoiceItem as ii0')
      .select('invoiceId', knex.raw('json_agg(ii0) as items'))
      .groupBy('invoiceId')
      .as('invoiceItem'),
    'invoiceItem.invoiceId',
    '=',
    'invoice.id',
  )
  .where({
    userId,
    'invoice.invoiceId': invoiceId,
    isActive: true,
  })
  .first();

exports.knexSelectInvoiceDetailVerify = ({ userId, invoiceId }) => knex('invoice')
  .select('id')
  .where({
    userId,
    'invoice.invoiceId': invoiceId,
    isActive: true,
  })
  .first();
