import Head from 'next/head';
import PropTypes from 'prop-types';

import { AppBar, InvoiceDetailPage } from '../../components';
import { useRedux } from '../../hooks';
import { actSetUser, selectUser } from '../../redux/userSlice';
import redirect from '../../utils/redirect';

const InvoiceDetail = ({ invoiceId, user }) => {
  useRedux({
    actionFn: actSetUser,
    data: user,
    selector: selectUser,
  });

  return (
    <>
      <Head>
        <title>
          Invoice
          {' '}
          {invoiceId}
        </title>
        <meta name="description" content="Invoice detail" />
      </Head>
      <AppBar />
      <InvoiceDetailPage invoiceId={invoiceId} />
    </>
  );
};

InvoiceDetail.defaultProps = {
  user: {},
};

InvoiceDetail.propTypes = {
  invoiceId: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  }),
};

export const getServerSideProps = async ({ params, req }) => {
  /* eslint-disable global-require */
  const { knexSelectInvoiceDetailVerify } = require('../../server/invoices/query');
  const { knexSelectUser } = require('../../server/users/query');
  /* eslint-enable global-require */

  const userId = req.session.passport?.user?.id;

  if (!userId) {
    return redirect();
  }

  const { invoiceId } = params;
  const invoice = await knexSelectInvoiceDetailVerify({ invoiceId, userId });

  if (!invoice) {
    return redirect();
  }

  const user = await knexSelectUser({ id: userId });

  return {
    props: {
      invoiceId,
      user,
    },
  };
};

export default InvoiceDetail;
