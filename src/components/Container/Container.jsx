import cx from 'clsx';
import PropTypes from 'prop-types';

import styles from './Container.module.scss';

const Container = ({
  children,
  className,
  component: Component,
  ...props
}) => (
  <Component className={cx(styles.container, className)} {...props}>
    {children}
  </Component>
);

Container.defaultProps = {
  className: null,
  component: 'div',
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: PropTypes.string,
};

export default Container;
