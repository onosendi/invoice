import Head from 'next/head';
import PropTypes from 'prop-types';

import { AppBar, InvoicesPage } from '../../components';
import { useRedux } from '../../hooks';
import { actSetUser, selectUser } from '../../redux/userSlice';
import redirect from '../../utils/redirect';

const Invoices = ({ user }) => {
  useRedux({
    actionFn: actSetUser,
    data: user,
    selector: selectUser,
  });

  return (
    <>
      <Head>
        <title>Invoices</title>
        <meta name="description" content="Invoices" />
      </Head>
      <AppBar />
      <InvoicesPage />
    </>
  );
};

Invoices.defaultProps = {
  user: {},
};

Invoices.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  }),
};

export const getServerSideProps = async ({ req }) => {
  // eslint-disable-next-line global-require
  const { knexSelectUser } = require('../../server/users/query');

  const userId = req.session.passport?.user?.id;

  if (!userId) {
    return redirect();
  }

  const user = await knexSelectUser({ id: userId });

  return {
    props: {
      user,
    },
  };
};

export default Invoices;
