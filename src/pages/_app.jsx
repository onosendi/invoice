import Head from 'next/head';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import store from '../redux/store';
import '../styles/index.scss';
import isClient from '../utils/isClient';

const App = ({ Component, pageProps }) => {
  if (isClient) {
    document.body.dataset.theme = localStorage.getItem('theme') || 'dark';
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default App;
