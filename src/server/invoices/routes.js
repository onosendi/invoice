const express = require('express');

const { needsLogin } = require('../core/auth');
const controllers = require('./controllers');

const router = express.Router();

router.route('/invoices')
  .get(needsLogin, controllers.getInvoices)
  .post(needsLogin, controllers.createInvoice);

router.route('/invoices/draft').post(needsLogin, controllers.createDraft);

router.route('/invoices/:invoiceId/status')
  .patch(needsLogin, controllers.updateStatus);

router.route('/invoices/:invoiceId')
  .delete(needsLogin, controllers.deleteInvoice)
  .get(needsLogin, controllers.getInvoiceDetail)
  .patch(needsLogin, controllers.updateInvoice);

module.exports = router;
