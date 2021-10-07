import Head from 'next/head';

import { IndexPage } from '../components';

const Index = () => (
  <>
    <Head>
      <title>
        Frontend Mentor
        {' | '}
        {process.env.NEXT_PUBLIC_APP_NAME}
      </title>
      <meta name="description" content="Invoice application" />
    </Head>
    <IndexPage />
  </>
);

export const getServerSideProps = ({ req }) => {
  // eslint-disable-next-line global-require
  const { needsToBeAnonymous } = require('../utils/authRoutes');
  return needsToBeAnonymous({ req });
};

export default Index;
