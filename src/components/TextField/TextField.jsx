import cx from 'clsx';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { InputLabel } from '..';
import styles from './TextField.module.scss';

const TextField = forwardRef(({
  error,
  helperText,
  id,
  inputClassName,
  label,
  labelClassName,
  name,
  placeholder,
  type,
  ...props
}, fRef) => (
  <InputLabel
    className={labelClassName}
    error={error}
    helperText={helperText}
    htmlFor={id}
    label={label}
  >
    <input
      className={cx(
        styles.input,
        error && styles.inputError,
        'type-4',
        'theme-bg2',
        'theme-text1',
        'theme-input-stroke',
        inputClassName,
      )}
      id={id}
      name={name}
      placeholder={placeholder}
      ref={fRef}
      type={type}
      {...props}
    />
  </InputLabel>
));

TextField.defaultProps = {
  error: false,
  helperText: null,
  inputClassName: null,
  labelClassName: null,
  placeholder: null,
  type: 'text',
};

TextField.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default TextField;
