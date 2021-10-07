import cx from 'clsx';
import PropTypes from 'prop-types';

import styles from './InvoiceStatus.module.scss';

const InvoiceStatus = ({ className, status }) => (
  <span
    className={cx(
      'theme-text3',
      'type-4',
      styles.status,
      styles[status],
      className,
    )}
  >
    <span />
    {status}
  </span>
);

InvoiceStatus.defaultProps = {
  className: null,
};

InvoiceStatus.propTypes = {
  className: PropTypes.string,
  status: PropTypes.oneOf(['draft', 'paid', 'pending']).isRequired,
};

export default InvoiceStatus;
