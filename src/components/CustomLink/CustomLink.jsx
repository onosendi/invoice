import cx from 'clsx';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './CustomLink.module.scss';

const CustomLink = ({ children, className, href }) => (
  <Link href={href}>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a className={cx(className, styles.link)}>{children}</a>
  </Link>
);

CustomLink.defaultProps = {
  className: null,
};

CustomLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default CustomLink;
