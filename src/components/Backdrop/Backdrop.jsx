import cx from 'clsx';
import PropTypes from 'prop-types';
import { useRef } from 'react';

import { Portal } from '..';

import styles from './Backdrop.module.scss';

const Backdrop = ({ className, show }) => {
  const ref = useRef(null);

  return (
    <Portal id="backdrop" ref={ref}>
      <div
        className={cx(
          styles.backdrop,
          show ? styles.open : styles.close,
          className,
        )}
      />
    </Portal>
  );
};

Backdrop.defaultProps = {
  className: null,
};

Backdrop.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool.isRequired,
};

export default Backdrop;
