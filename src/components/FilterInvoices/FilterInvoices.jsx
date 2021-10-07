import cx from 'clsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  AltText,
  Checkbox,
  DropdownArrow,
  Popover,
} from '..';
import { useEffectAfterInitial } from '../../hooks';
import {
  actSetFilter,
  actUnsetFilter,
  getInvoices,
  selectFilter,
} from '../../redux/invoiceSlice';
import styles from './FilterInvoices.module.scss';

const FilterInvoices = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const filter = useSelector(selectFilter);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const setFilter = (f) => {
    dispatch(actSetFilter(f));
  };

  const unsetFilter = (f) => {
    dispatch(actUnsetFilter(f));
  };

  useEffectAfterInitial(() => {
    const params = new URLSearchParams();
    filter.forEach((f) => {
      params.append('filter', f);
    });
    dispatch(getInvoices({ params }));
  }, [filter]);

  return (
    <>
      <button
        aria-label="Filter invoices by status"
        className={cx(
          styles.button,
          'type-4',
          'theme-text1',
        )}
        onClick={handleClick}
        type="button"
      >
        <AltText alt="Filter">Filter by status</AltText>
        <span className={cx(styles.arrowWrapper)}>
          <DropdownArrow open={Boolean(anchorEl)} />
        </span>
      </button>
      <Popover
        anchorEl={anchorEl}
        className={cx(
          'theme-bg7',
          'theme-drop-shadow',
          styles.popover,
        )}
        closeClass={styles.close}
        id="filter-invoices"
        onClose={handleClose}
        open={Boolean(anchorEl)}
        openClass={styles.open}
        origin="center"
      >
        <Checkbox
          checked={filter.includes('paid')}
          id="paid"
          label="Paid"
          name="filter"
          onCheck={() => { setFilter('paid'); }}
          onUncheck={() => { unsetFilter('paid'); }}
        />
        <Checkbox
          checked={filter.includes('pending')}
          id="pending"
          label="Pending"
          name="filter"
          onCheck={() => { setFilter('pending'); }}
          onUncheck={() => { unsetFilter('pending'); }}
        />
        <Checkbox
          checked={filter.includes('draft')}
          id="draft"
          label="Draft"
          name="filter"
          onCheck={() => { setFilter('draft'); }}
          onUncheck={() => { unsetFilter('draft'); }}
        />
      </Popover>
    </>
  );
};

export default FilterInvoices;
