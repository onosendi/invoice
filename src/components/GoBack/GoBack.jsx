import cx from 'clsx';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './GoBack.module.scss';

const GoBack = ({ className, href }) => (
  <Link href={href}>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a
      className={cx(
        'theme-text1',
        'type-4',
        styles.link,
        className,
      )}
    >
      Go back
    </a>
  </Link>
);

GoBack.defaultProps = {
  className: null,
};

GoBack.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
};

export default GoBack;
