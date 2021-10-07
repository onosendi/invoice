import cx from 'clsx';
import PropTypes from 'prop-types';

import styles from './InvoiceId.module.scss';

const InvoiceId = ({ className, invoiceId }) => (
  <span className={cx(styles.invoiceId, className)}>
    {invoiceId}
  </span>
);

InvoiceId.defaultProps = {
  className: null,
};

InvoiceId.propTypes = {
  className: PropTypes.string,
  invoiceId: PropTypes.string.isRequired,
};

export default InvoiceId;
