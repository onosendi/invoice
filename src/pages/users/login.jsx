import Head from 'next/head';

import { LoginPage } from '../../components';

const Login = () => (
  <>
    <Head>
      <title>
        Login
        {' | '}
        {process.env.NEXT_PUBLIC_APP_NAME}
      </title>
      <meta name="description" content="Login" />
    </Head>
    <LoginPage />
  </>
);

export const getServerSideProps = ({ req }) => {
  // eslint-disable-next-line global-require
  const { needsToBeAnonymous } = require('../../utils/authRoutes');
  return needsToBeAnonymous({ req });
};

export default Login;
