import Head from 'next/head';

import { RegisterPage } from '../../components';

const Register = () => (
  <>
    <Head>
      <title>
        Register
        {' | '}
        {process.env.NEXT_PUBLIC_APP_NAME}
      </title>
      <meta name="description" content="Register" />
    </Head>
    <RegisterPage />
  </>
);

export const getServerSideProps = ({ req }) => {
  // eslint-disable-next-line global-require
  const { needsToBeAnonymous } = require('../../utils/authRoutes');
  return needsToBeAnonymous({ req });
};

export default Register;
