import cx from 'clsx';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './Logo.module.scss';

const Logo = ({ className }) => (
  <Link href="/">
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a className={cx(styles.logo, className)}>
      <h1 className={cx('sr-only')}>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
    </a>
  </Link>
);

Logo.defaultProps = {
  className: null,
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
