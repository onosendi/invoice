import cx from 'clsx';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  AltText,
  InvoiceListItem,
  LoadingSpinner,
  Wait,
} from '..';
import { useUI } from '../../hooks';
import {
  getInvoices,
  key,
  selectInvoices,
} from '../../redux/invoiceSlice';
import styles from './InvoiceList.module.scss';

const InvoiceList = memo(({ className }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const invoices = useSelector(selectInvoices);
  const [cache, loading] = useUI({ key: key.getInvoices });

  useEffect(() => {
    if (!cache) {
      dispatch(getInvoices());
    }
  }, [router.route]);

  if (loading) {
    return (
      <Wait milliseconds={500}>
        <LoadingSpinner />
      </Wait>
    );
  }

  if (!loading && !invoices.length) {
    return (
      <div className={cx(styles.noContent)}>
        <img src="img/illustration-empty.svg" alt="Empty ilustration" />
        <p className={cx('type-2', 'theme-text1')}>There is nothing here</p>
        <p className={cx('type-body1', 'theme-text2')}>
          Create an invoice by clicking the
          {' '}
          <AltText alt="new" className={cx('bold')}>new invoice</AltText>
          {' '}
          button and get started
        </p>
      </div>
    );
  }

  return (
    <ul className={cx(styles.list, className)}>
      {invoices.map((invoice) => (
        <InvoiceListItem invoice={invoice} key={invoice.invoiceId} />
      ))}
    </ul>
  );
});

InvoiceList.defaultProps = {
  className: null,
};

InvoiceList.propTypes = {
  className: PropTypes.string,
};

export default InvoiceList;
