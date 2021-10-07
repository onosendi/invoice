const eah = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const knex = require('../core/db');
const genId = require('../core/genInvoiceId');
const status = require('../core/status');
const msg = require('../core/validatorMessages');
const { isDate } = require('../core/validators');
const { toNumber } = require('../core/sanitizers');
const {
  knexSelectInvoiceDetail,
  knexSelectInvoiceDetailVerify,
  knexSelectInvoices,
} = require('./query');
const { normalizeErrors, prepareItems } = require('./utils');

const abstractCreateInvoice = ({ invoiceStatus }) => eah(async (req, res) => {
  const { items, ...rest } = req.body;
  const { id: userId } = req.user;

  const invoiceUUID = uuidv4();
  const invoiceId = genId();

  const dataWithoutItems = {
    ...rest,
    id: invoiceUUID,
    invoiceId,
    status: invoiceStatus,
    userId,
  };

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const preparedItems = prepareItems({ invoiceId: invoiceUUID, items });
    eah(await knex.transaction(async (trx) => {
      await knex('invoice').insert(dataWithoutItems).transacting(trx);
      if (preparedItems.length) {
        await knex('invoiceItem').insert(preparedItems).transacting(trx);
      }
    }));
    const invoiceDetail = await knexSelectInvoiceDetail({ userId, invoiceId });
    res.status(status.HTTP_201_CREATED).json(invoiceDetail);
  } else {
    const mappedErrors = errors.mapped();
    const normalizedErrors = normalizeErrors({ errors: mappedErrors });
    res.status(status.HTTP_400_BAD_REQUEST).json({ errors: normalizedErrors });
  }
});

const draftValidators = [
  body('invoiceDate').custom(isDate).toDate(),
  body('term').isInt().toInt(),
];

const invoiceValidators = [
  ...draftValidators,
  body('fromStreet').notEmpty().withMessage(msg.REQUIRED),
  body('fromCity').notEmpty().withMessage(msg.REQUIRED),
  body('fromPostCode').notEmpty().withMessage(msg.REQUIRED),
  body('fromCountry').notEmpty().withMessage(msg.REQUIRED),
  body('name').notEmpty().withMessage(msg.REQUIRED),
  body('email')
    .notEmpty()
    .withMessage(msg.REQUIRED)
    .isEmail()
    .withMessage(msg.EMAIL),
  body('street').notEmpty().withMessage(msg.REQUIRED),
  body('city').notEmpty().withMessage(msg.REQUIRED),
  body('postCode').notEmpty().withMessage(msg.REQUIRED),
  body('country').notEmpty().withMessage(msg.REQUIRED),
  body('description').notEmpty().withMessage(msg.REQUIRED),
  body('items').custom((value) => {
    if (!value || !value.length) {
      throw new Error('You must add at least one item');
    }
    return true;
  }),
  body('items.*.name').notEmpty(),
  body('items.*.quantity').trim().isNumeric().customSanitizer(toNumber),
  body('items.*.price').trim().isNumeric().customSanitizer(toNumber),
];

exports.getInvoices = eah(async (req, res) => {
  const { id } = req.user;
  const filter = [].concat(req.query.filter || []);
  const invoices = await knexSelectInvoices({ id, filter });

  res.json(invoices);
});

exports.getInvoiceDetail = eah(async (req, res) => {
  const { id } = req.user;
  const { invoiceId } = req.params;

  const invoice = await knexSelectInvoiceDetail({ userId: id, invoiceId });

  if (!invoice) {
    res.status(status.HTTP_404_NOT_FOUND).json({});
    return;
  }

  res.json(invoice);
});

exports.createInvoice = [
  invoiceValidators,

  abstractCreateInvoice({ invoiceStatus: 'pending' }),
];

exports.createDraft = [
  draftValidators,

  abstractCreateInvoice({ invoiceStatus: 'draft' }),
];

exports.updateInvoice = [
  invoiceValidators,

  eah(async (req, res) => {
    const { id: userId } = req.user;
    const { invoiceId } = req.params;

    const invoice = await knexSelectInvoiceDetailVerify({ userId, invoiceId });

    if (!invoice) {
      res.status(status.HTTP_404_NOT_FOUND).json({});
      return;
    }

    const { items, ...rest } = req.body;
    const dataWithoutItems = { ...rest, status: 'pending' };
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const preparedItems = prepareItems({ invoiceId: invoice.id, items });
      eah(await knex.transaction(async (trx) => {
        await knex('invoice')
          .where({ userId, invoiceId })
          .update(dataWithoutItems).transacting(trx);
        await knex('invoiceItem')
          .where({ invoiceId: invoice.id })
          .delete()
          .transacting(trx);
        if (preparedItems.length) {
          await knex('invoiceItem').insert(preparedItems).transacting(trx);
        }
      }));
      const invoiceDetail = await knexSelectInvoiceDetail({ userId, invoiceId });
      res.status(status.HTTP_200_OK).json(invoiceDetail);
    } else {
      const mappedErrors = errors.mapped();
      const normalizedErrors = normalizeErrors({ errors: mappedErrors });
      res.status(status.HTTP_400_BAD_REQUEST).json({ errors: normalizedErrors });
    }
  }),
];

exports.updateStatus = [
  body('status').custom((value) => ['paid', 'pending'].includes(value)),

  eah(async (req, res) => {
    const { id: userId } = req.user;
    const { invoiceId } = req.params;
    const { status: invoiceStatus } = req.body;

    const invoice = await knexSelectInvoiceDetailVerify({ userId, invoiceId });
    const errors = validationResult(req);

    if (!invoice || !errors.isEmpty()) {
      res.status(status.HTTP_404_NOT_FOUND).json({});
      return;
    }

    await knex('invoice')
      .where({ userId, invoiceId })
      .update({ status: invoiceStatus });

    res.status(status.HTTP_200_OK).json({});
  }),
];

exports.deleteInvoice = eah(async (req, res) => {
  const { id: userId } = req.user;
  const { invoiceId } = req.params;

  const invoice = await knexSelectInvoiceDetailVerify({ userId, invoiceId });

  if (!invoice) {
    res.status(status.HTTP_404_NOT_FOUND).json({});
    return;
  }

  await knex('invoice').where({ userId, invoiceId }).delete();

  res.status(status.HTTP_204_NO_CONTENT).json({});
});
