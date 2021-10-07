import cx from 'clsx';
import PropTypes from 'prop-types';

const NAText = ({
  altText,
  children,
  className,
  component: Component,
  ...props
}) => (
  <Component
    className={cx(
      className,
      !children && 'theme-na',
    )}
    {...props}
  >
    {children || altText}
  </Component>
);

NAText.defaultProps = {
  children: null,
  className: null,
  component: 'span',
};

NAText.propTypes = {
  altText: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.string,
};

export default NAText;
