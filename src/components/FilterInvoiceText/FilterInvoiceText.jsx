import cx from 'clsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectFilter, selectInvoices } from '../../redux/invoiceSlice';
import pluralize from '../../utils/pluralize';

const FilterInvoiceText = () => {
  const invoices = useSelector(selectInvoices);
  const filters = useSelector(selectFilter);
  const [displayText, setDisplayText] = useState('');

  const countByFilter = (f) => invoices.filter((i) => i.status === f).length;

  const buildString = (t, count) => `${count} ${t}`;

  const getFromFilter = () => {
    let total = 0;
    let result = [];

    filters.forEach((filter) => {
      const count = countByFilter(filter);
      total += count;
      const t = filter === 'draft' ? pluralize({ text: filter, count }) : filter;
      result.push(buildString(t, count));
    });

    if (result.length > 1 && total > 0) {
      result = [...result, buildString('total', total)];
    }

    return result;
  };

  const getInvoices = () => {
    const count = invoices.length;
    const text = pluralize({ text: 'invoice', count });
    return [buildString(text, count)];
  };

  const updateText = () => {
    let string;

    if (filters.length) {
      string = getFromFilter();
    } else {
      string = getInvoices();
    }

    const joinedString = string.join(', ');

    setDisplayText(joinedString);
  };

  useEffect(() => {
    updateText();
  }, [invoices]);

  return (
    <p className={cx('type-body1', 'theme-text2')}>
      Showing
      {' '}
      {displayText}
    </p>
  );
};

export default FilterInvoiceText;
