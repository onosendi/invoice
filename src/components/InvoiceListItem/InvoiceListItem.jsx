import cx from 'clsx';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { InvoiceId, InvoiceStatus, Time } from '..';
import { getDueDate } from '../../utils/date';
import currency from '../../utils/currency';
import styles from './InvoiceListItem.module.scss';
import grandTotal from '../../utils/grandTotal';

const InvoiceListItem = ({ invoice }) => {
  const {
    invoiceDate: epochDate,
    invoiceId,
    name,
    status,
    term,
    items,
  } = invoice;

  const dueDate = epochDate && term && getDueDate({
    epochDate,
    term,
  });

  const total = items && currency(grandTotal(items));

  return (
    <li>
      <Link
        href={`/invoices/${invoiceId}`}
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className={cx(
            'theme-bg2',
            'theme-text1',
            styles.item,
          )}
        >
          <InvoiceId className={cx(styles.invoiceId, 'type-4')} invoiceId={invoiceId} />
          {dueDate && (
            <Time
              className={cx(styles.dueDate, 'type-body1', 'theme-text2')}
              date={dueDate}
            />
          )}
          {invoice.name && (
            <span className={cx(styles.name, 'type-body1')}>{name}</span>
          )}
          <span className={cx(styles.total, 'type-3')}>{total}</span>
          <InvoiceStatus className={cx(styles.status)} status={status} />
        </a>
      </Link>
    </li>
  );
};

InvoiceListItem.defaultProps = {
  invoice: {
    invoiceDate: null,
    name: '',
    term: null,
    items: [
      {
        name: null,
        price: null,
        quantity: null,
      },
    ],
  },
};

InvoiceListItem.propTypes = {
  invoice: PropTypes.shape({
    invoiceDate: PropTypes.number,
    invoiceId: PropTypes.string.isRequired,
    name: PropTypes.string,
    status: PropTypes.oneOf(['draft', 'paid', 'pending']).isRequired,
    term: PropTypes.oneOf(['1', '7', '14', '30']),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
      }),
    ),
  }),
};

export default InvoiceListItem;
