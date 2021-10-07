import cx from 'clsx';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import {
  CreateInvoiceFormItems,
  DateField,
  Term,
  TextField,
} from '..';
import { getDate } from '../../utils/date';
import styles from './InvoiceForm.module.scss';

const InvoiceForm = forwardRef(({
  errors,
  invoice,
  setErrors,
}, formRef) => {
  const {
    fromStreet,
    fromCity,
    fromPostCode,
    fromCountry,
    name,
    email,
    street,
    city,
    postCode,
    country,
    invoiceDate: epochDate,
    term,
    description,
    items,
  } = invoice;

  const invoiceDate = epochDate && getDate(epochDate);

  return (
    <form className={cx(styles.form)} ref={formRef} noValidate>
      <fieldset>
        <legend className={cx('type-4')}>Bill from</legend>
        <div className={cx(styles.fieldsetGrid, styles.billFieldset)}>
          <TextField
            defaultValue={fromStreet}
            error={!!errors.fromStreet}
            helperText={errors?.fromStreet?.msg}
            id="fromStreet"
            label="Street Address"
            labelClassName={cx(styles.fromStreet)}
            name="fromStreet"
          />
          <TextField
            defaultValue={fromCity}
            error={!!errors.fromCity}
            helperText={errors?.fromCity?.msg}
            id="fromCity"
            label="City"
            labelClassName={cx(styles.fromCity)}
            name="fromCity"
          />
          <TextField
            defaultValue={fromPostCode}
            error={!!errors.fromPostCode}
            helperText={errors?.fromPostCode?.msg}
            id="fromPostCode"
            label="Post Code"
            labelClassName={cx(styles.fromPostCode)}
            name="fromPostCode"
          />
          <TextField
            defaultValue={fromCountry}
            error={!!errors.fromCountry}
            helperText={errors?.fromCountry?.msg}
            id="fromCountry"
            label="Country"
            labelClassName={cx(styles.fromCountry)}
            name="fromCountry"
          />
        </div>
      </fieldset>
      <fieldset>
        <legend className={cx('type-4')}>Bill to</legend>
        <div className={cx(styles.fieldsetGrid, styles.billFieldset)}>
          <TextField
            defaultValue={name}
            error={!!errors.name}
            helperText={errors?.name?.msg}
            id="name"
            label="Client's Name"
            labelClassName={cx(styles.name)}
            name="name"
          />
          <TextField
            defaultValue={email}
            error={!!errors.email}
            helperText={errors?.email?.msg}
            id="email"
            label="Client's Email"
            labelClassName={cx(styles.email)}
            name="email"
          />
          <TextField
            defaultValue={street}
            error={!!errors.street}
            helperText={errors?.street?.msg}
            id="street"
            label="Street Address"
            labelClassName={cx(styles.street)}
            name="street"
          />
          <TextField
            defaultValue={city}
            error={!!errors.city}
            helperText={errors?.city?.msg}
            id="city"
            label="City"
            labelClassName={cx(styles.city)}
            name="city"
          />
          <TextField
            defaultValue={postCode}
            error={!!errors.postCode}
            helperText={errors?.postCode?.msg}
            id="postCode"
            label="Post Code"
            labelClassName={cx(styles.postCode)}
            name="postCode"
          />
          <TextField
            defaultValue={country}
            error={!!errors.country}
            helperText={errors?.country?.msg}
            id="country"
            label="Country"
            labelClassName={cx(styles.country)}
            name="country"
          />
        </div>
      </fieldset>
      <fieldset className={cx(styles.fieldsetProjectInfo, styles.fieldsetGrid)}>
        <DateField
          id="invoiceDate"
          error={!!errors.invoiceDate}
          helperText={errors?.invoiceDate?.msg}
          label="Invoice Date"
          name="invoiceDate"
          value={invoiceDate}
        />
        <Term
          defaultValue={term}
          error={!!errors.term}
          helperText={errors?.term?.msg}
        />
        <TextField
          defaultValue={description}
          error={!!errors.description}
          helperText={errors?.description?.msg}
          id="description"
          label="Project Description"
          labelClassName={styles.description}
          name="description"
        />
      </fieldset>
      <fieldset>
        <div className={cx(styles.itemsHeadingWrapper)}>
          <span className={cx(styles.itemsHeading)}>Item List</span>
          {!!errors.items && (
            <span className={cx('type-body1', styles.noItemsError)}>
              {errors.items.msg}
            </span>
          )}
        </div>
        <CreateInvoiceFormItems
          errors={errors}
          items={items}
          setErrors={setErrors}
        />
      </fieldset>
    </form>
  );
});

InvoiceForm.defaultProps = {
  invoice: {
    items: [],
  },
};

InvoiceForm.propTypes = {
  errors: PropTypes.shape({
    fromStreet: PropTypes.shape({
      msg: PropTypes.string,
    }),
    fromCity: PropTypes.shape({
      msg: PropTypes.string,
    }),
    fromPostCode: PropTypes.shape({
      msg: PropTypes.string,
    }),
    fromCountry: PropTypes.shape({
      msg: PropTypes.string,
    }),
    name: PropTypes.shape({
      msg: PropTypes.string,
    }),
    email: PropTypes.shape({
      msg: PropTypes.string,
    }),
    street: PropTypes.shape({
      msg: PropTypes.string,
    }),
    city: PropTypes.shape({
      msg: PropTypes.string,
    }),
    postCode: PropTypes.shape({
      msg: PropTypes.string,
    }),
    country: PropTypes.shape({
      msg: PropTypes.string,
    }),
    invoiceDate: PropTypes.shape({
      msg: PropTypes.string,
    }),
    term: PropTypes.shape({
      msg: PropTypes.string,
    }),
    description: PropTypes.shape({
      msg: PropTypes.string,
    }),
    status: PropTypes.shape({
      msg: PropTypes.string,
    }),
    items: PropTypes.shape({
      msg: PropTypes.string,
    }),
  }).isRequired,
  invoice: PropTypes.shape({
    fromStreet: PropTypes.string,
    fromCity: PropTypes.string,
    fromPostCode: PropTypes.string,
    fromCountry: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    postCode: PropTypes.string,
    country: PropTypes.string,
    invoiceDate: PropTypes.number,
    term: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  setErrors: PropTypes.func.isRequired,
};

export default InvoiceForm;
