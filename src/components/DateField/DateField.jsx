import cx from 'clsx';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { InputLabel } from '..';
import textFieldStyles from '../TextField/TextField.module.scss';
import styles from './DateField.module.scss';

const CustomInput = forwardRef(({
  error,
  inputId,
  onClick,
  value,
}, fRef) => (
  <>
    <button
      className={cx(
        'type-4',
        'theme-bg2',
        'theme-text1',
        'theme-input-stroke',
        error && textFieldStyles.inputError,
        textFieldStyles.input,
        styles.input,
      )}
      onClick={onClick}
      ref={fRef}
      type="button"
    >
      {value}
    </button>
    <input
      id={inputId}
      name="invoiceDate"
      type="hidden"
      value={value}
    />
  </>
));

CustomInput.defaultProps = {
  error: false,
  onClick: () => {},
  value: null,
};

CustomInput.propTypes = {
  error: PropTypes.bool,
  inputId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  value: PropTypes.string,
};

const DateField = ({
  error,
  helperText,
  id,
  label,
  value,
}) => {
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    setStartDate(value || new Date());
  }, []);

  return (
    <div className={cx(styles.wrapper)}>
      <InputLabel
        error={error}
        helperText={helperText}
        htmlFor={id}
        label={label}
      >
        <DatePicker
          // Datepicker's styles are overridden in styles vendor directory.
          customInput={(
            <CustomInput
              error={error}
              inputId={id}
            />
          )}
          dateFormat="d MMM yyyy"
          onChange={(date) => setStartDate(date)}
          selected={startDate}
        />
      </InputLabel>
    </div>
  );
};

DateField.defaultProps = {
  error: false,
  helperText: null,
  value: null,
};

DateField.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date),
};

export default DateField;
