import cx from 'clsx';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { createElement } from 'react';

import { AltText } from '..';
import styles from './Button.module.scss';

const Button = ({
  altText,
  children,
  className,
  href,
  variant,
  type,
  ...props
}) => {
  if (variant === '1' && !altText) {
    console.error('Variant `1` must include alternate text');
  }

  const renderChildren = () => {
    if (variant === '1') {
      return <AltText alt={altText}>{children}</AltText>;
    }
    return children;
  };

  const component = createElement(
    href ? 'a' : 'button',
    {
      className: cx(
        'type-4',
        styles.button,
        styles[`variant${variant}`],
        className,
      ),
      type,
      ...props,
    },
    renderChildren(),
  );

  return href ? <Link href={href}>{component}</Link> : component;
};

Button.defaultProps = {
  altText: null,
  className: null,
  href: null,
  type: 'button',
  variant: '1',
};

Button.propTypes = {
  altText: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
  variant: PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7']),
};

export default Button;
