import cx from 'clsx';
import PropTypes from 'prop-types';

import styles from './AltText.module.scss';

const AltText = ({
  alt,
  children,
  className,
  respondTo,
}) => (
  <span
    className={cx(
      styles.parent,
      styles[respondTo],
      className,
    )}
    data-alt-text={alt}
  >
    <span className={cx(styles.child)}>{children}</span>
  </span>
);

AltText.defaultProps = {
  className: null,
  respondTo: 'md',
};

AltText.propTypes = {
  alt: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  respondTo: PropTypes.string,
};

export default AltText;
