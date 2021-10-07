import cx from 'clsx';
import PropTypes from 'prop-types';

import styles from './DropdownArrow.module.scss';

const DropdownArrow = ({ open }) => (
  <span className={cx(styles.span, open && styles.open)} />
);

DropdownArrow.defaultProps = {
  open: false,
};

DropdownArrow.propTypes = {
  open: PropTypes.bool,
};

export default DropdownArrow;
