import cx from 'clsx';
import PropTypes from 'prop-types';

import styles from './InputLabel.module.scss';

const InputLabel = ({
  children,
  className,
  error,
  helperText,
  htmlFor,
  label,
  ...props
}) => (
  <label
    className={cx(
      styles.label, error ? 'clr-alert-error' : 'theme-text2',
      className,
    )}
    htmlFor={htmlFor}
    {...props}
  >
    <span className={cx(styles.labelHelperWrapper, 'type-body1')}>
      <span className={cx(styles.labelText)}>
        {label}
      </span>
      {helperText && (
        <span className={cx(styles.helperText)}>
          {helperText}
        </span>
      )}
    </span>
    {children}
  </label>
);

InputLabel.defaultProps = {
  className: null,
  error: false,
  helperText: null,
};

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default InputLabel;
