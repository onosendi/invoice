import cx from 'clsx';
import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './Checkbox.module.scss';

const Checkbox = ({
  checked,
  id,
  label,
  name,
  onCheck,
  onUncheck,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked && onCheck) {
      onCheck();
    }
    if (isChecked && onUncheck) {
      onUncheck();
    }
  };

  return (
    <label
      className={cx(
        'type-4',
        'theme-text1',
        styles.label,
      )}
      htmlFor={id}
    >
      <input
        className={cx(styles.input)}
        id={id}
        name={name}
        onChange={handleChange}
        type="checkbox"
      />
      <div
        className={cx(
          'theme-bg4',
          styles.checkbox,
          isChecked && styles.checkboxChecked,
        )}
      >
        <span className={cx(styles.checkmark)} />
      </div>
      <span className={cx(styles.labelText)}>{label}</span>
    </label>
  );
};

Checkbox.defaultProps = {
  checked: false,
  onCheck: null,
  onUncheck: null,
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onCheck: PropTypes.func,
  onUncheck: PropTypes.func,
};

export default Checkbox;
