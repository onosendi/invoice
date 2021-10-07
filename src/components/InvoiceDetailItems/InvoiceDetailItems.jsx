import cx from 'clsx';
import PropTypes from 'prop-types';

import currency from '../../utils/currency';
import styles from './InvoiceDetailItems.module.scss';

const InvoiceDetailItems = ({ items }) => {
  if (!items) {
    return (
      <span
        className={cx(
          'theme-text1',
          'type-body1',
          'theme-na',
          styles.noData,
        )}
      >
        &lt;items&gt;
      </span>
    );
  }

  return (
    <table className={cx(styles.table)}>
      <thead className={cx('theme-text2', 'type-body2', styles.tableHideForMobile)}>
        <tr>
          <td>Item Name</td>
          <td>QTY.</td>
          <td>Price</td>
          <td>Total</td>
        </tr>
      </thead>
      <tbody className={cx('theme-text1', 'type-4')}>
        {items.map((item) => (
          <tr key={item.name}>
            <td>{item.name}</td>
            <td className={cx(styles.tableHideForMobile)}>{item.quantity}</td>
            <td data-item-quantity={item.quantity || 0}>{currency(item.price)}</td>
            <td>{currency(item.quantity * item.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

InvoiceDetailItems.defaultProps = {
  items: {
    name: null,
    quantity: null,
    price: null,
  },
};

InvoiceDetailItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ),
};

export default InvoiceDetailItems;
