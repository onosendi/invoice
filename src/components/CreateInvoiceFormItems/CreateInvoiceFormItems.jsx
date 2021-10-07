import cx from 'clsx';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Button, TextField } from '..';
import { actSetInvoiceItems, selectInvoiceItems } from '../../redux/invoiceSlice';
import currency from '../../utils/currency';
import styles from './CreateInvoiceFormItems.module.scss';

const CreateInvoiceFormItems = ({
  errors,
  items: data,
  setErrors,
}) => {
  const dispatch = useDispatch();
  const items = useSelector(selectInvoiceItems);

  useEffect(() => {
    if (Array.isArray(data)) {
      const newArr = data.map((i) => ({
        ...i,
        total: i.price * i.quantity,
      }));
      dispatch(actSetInvoiceItems(newArr));
    }
  }, [data]);

  const handleChange = ({ id, name }) => (event) => {
    const { value } = event.currentTarget;
    const obj = items.find((i) => i.id === id);
    const newObj = { ...obj, [name]: value };
    if (name !== 'name') {
      const total = newObj.price * newObj.quantity;
      newObj.total = Number.isNaN(total) ? 0 : total;
    }
    const newArr = items.map((i) => (i.id === id ? { ...i, ...newObj } : i));
    dispatch(actSetInvoiceItems(newArr));
  };

  const createItem = () => {
    const newArr = [...items, { id: uuidv4() }];
    dispatch(actSetInvoiceItems(newArr));
  };

  const deleteItem = ({ id, index }) => () => {
    if (Object.entries(errors).length) {
      // Remove item error with `index` as the key.
      const errorsWithRemovedItem = Object.keys(errors.invoiceItems).reduce((acc, key) => (
        Number(key) !== index ? { ...acc, [key]: errors.invoiceItems[key] } : acc), {});

      // Change the item error key of every item with an index higer than `index`.
      const newItems = Object.keys(errorsWithRemovedItem).reduce((acc, key) => {
        const keyAsNumber = Number(key);
        const newKey = keyAsNumber > index ? keyAsNumber - 1 : keyAsNumber;
        acc[`${newKey}`] = errorsWithRemovedItem[key];
        return acc;
      }, {});

      setErrors({ ...errors, invoiceItems: newItems });
    }

    const newArr = items.filter((i) => i.id !== id);
    dispatch(actSetInvoiceItems(newArr));
  };

  const renderItems = () => (
    <div className={cx(styles.itemContainer)}>
      {items.map((item, index) => (
        <div className={cx(styles.item)} key={item.id}>
          <TextField
            defaultValue={item.name}
            error={!!errors.invoiceItems?.[index]?.name}
            id={`itemName-${item.id}`}
            label="Item Name"
            labelClassName={styles.itemName}
            name={`item_name_${item.id}`}
            onChange={handleChange({ id: item.id, name: 'name' })}
          />
          <TextField
            defaultValue={item.quantity}
            error={!!errors.invoiceItems?.[index]?.quantity}
            id={`quantity-${item.id}`}
            inputClassName={cx(styles.inputNumber)}
            label="Qty."
            labelClassName={styles.itemQuantity}
            maxLength="2"
            name={`item_quantity_${item.id}`}
            onChange={handleChange({ id: item.id, name: 'quantity' })}
          />
          <TextField
            defaultValue={item.price}
            error={!!errors.invoiceItems?.[index]?.price}
            id={`price-${item.id}`}
            inputClassName={cx(styles.inputNumber)}
            label="Price"
            labelClassName={styles.itemPrice}
            name={`item_price_${item.id}`}
            onChange={handleChange({ id: item.id, name: 'price' })}
          />
          <div className={cx(styles.itemTotal)}>
            <span className={cx('type-body1', 'theme-text2')}>Total</span>
            <span className={cx('type-4', 'theme-text1')}>{currency(item.total || 0)}</span>
          </div>
          <div className={cx(styles.itemDelete, 'theme-text1')}>
            <button
              aria-label="Delete item"
              className={cx(styles.deleteButton)}
              onClick={deleteItem({ id: item.id, index })}
              type="button"
            >
              <span />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {!!items.length && renderItems()}
      <Button
        className={cx(
          styles.newItemButton,
          errors.items && styles.newItemButtonError,
        )}
        onClick={createItem}
        variant="6"
      >
        Add New Item
      </Button>
    </>
  );
};

CreateInvoiceFormItems.defaultProps = {
  items: [],
};

CreateInvoiceFormItems.propTypes = {
  errors: PropTypes.shape({
    invoiceItems: PropTypes.shape({}),
    items: PropTypes.shape({}),
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  })),
  setErrors: PropTypes.func.isRequired,
};

export default CreateInvoiceFormItems;
