import cx from 'clsx';
import PropTypes from 'prop-types';

import {
  createElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { InputLabel } from '..';
import { useOutsideClick } from '../../hooks';
import textFieldStyles from '../TextField/TextField.module.scss';
import styles from './Term.module.scss';

const listItems = [
  { value: 1, text: 'Net 1 Day' },
  { value: 7, text: 'Net 7 Days' },
  { value: 14, text: 'Net 14 Days' },
  { value: 30, text: 'Net 30 Days' },
];

const getNextKey = (array, currentKey, direction) => {
  const k = currentKey || (direction === 'inc' ? array[-1] : array[0]);
  const delta = direction === 'inc' ? 1 : -1;
  const index = array.indexOf(k);
  const nextIndex = (index + delta + array.length) % array.length;
  return array[nextIndex];
};

const Term = ({ defaultValue, error, helperText }) => {
  const [display, setDisplay] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [out, setOut] = useState(false);
  const [selection, setSelection] = useState(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const setValue = ({ value, text }) => {
    setDisplay(text);
    inputRef.current.value = value;
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setOut(true);
    setSelection(null);
  };

  const handleAnimationEnd = () => {
    if (out) {
      setOut(false);
      setIsOpen(false);
    }
  };

  const toggleOpen = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    if (['ArrowUp', 'ArrowDown'].includes(key)) {
      event.preventDefault();
    }
    if (key === 'ArrowUp') {
      const next = getNextKey(listItems, selection, 'dec');
      setSelection(next);
    } else if (key === 'ArrowDown') {
      const next = getNextKey(listItems, selection, 'inc');
      setSelection(next);
    } else if (selection && isOpen && ['Enter', 'Tab', ' '].includes(key)) {
      setValue(selection);
      close();
    }
    if (key === 'Tab') {
      close();
    }
  };

  const termItems = listItems.map((i) => createElement(
    'li',
    {
      className: cx(
        'theme-select-border',
        styles.item,
        selection && selection === i && styles.itemActive,
      ),
      key: i.value,
      onClick: () => {
        setValue({ value: i.value, text: i.text });
        close();
      },
      value: i.value,
    },
    i.text,
  ));

  useEffect(() => {
    let listItem;
    if (defaultValue) {
      listItem = listItems.find((i) => i.value === Number(defaultValue));
    } else {
      [listItem] = listItems;
    }
    setValue({ ...listItem });
  }, [defaultValue]);

  useOutsideClick({
    handler: close,
    open: isOpen,
    ref: listRef,
  });

  return (
    <div className={cx(styles.wrapper)}>
      <InputLabel
        htmlFor="term"
        label="Payment Terms"
        error={error}
        helperText={helperText}
      >
        <button
          className={cx(
            styles.display,
            error && textFieldStyles.inputError,
            'type-4',
            'theme-bg2',
            'theme-text1',
            'theme-input-stroke',
          )}
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          type="button"
        >
          {display}
        </button>
        <input
          aria-hidden="true"
          id="term"
          name="term"
          ref={inputRef}
          type="hidden"
        />
      </InputLabel>
      {isOpen && (
        <ul
          className={cx(
            'type-4',
            'theme-bg11',
            'theme-text1',
            'theme-drop-shadow',
            styles.list,
            out ? styles.close : styles.open,
          )}
          onAnimationEnd={handleAnimationEnd}
          ref={listRef}
        >
          {termItems}
        </ul>
      )}
    </div>
  );
};

Term.defaultProps = {
  defaultValue: null,
  error: false,
  helperText: null,
};

Term.propTypes = {
  defaultValue: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default Term;
