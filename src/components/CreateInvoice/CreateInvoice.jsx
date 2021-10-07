import cx from 'clsx';
import PropTypes from 'prop-types';
import { cloneElement, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Backdrop,
  Button,
  InvoiceForm,
  InvoiceId,
  Portal,
} from '..';
import { useKeyDown } from '../../hooks';
import {
  patchInvoice,
  postCreateDraft,
  postCreateInvoice,
  selectInvoiceItems,
} from '../../redux/invoiceSlice';
import styles from './CreateInvoice.module.scss';
import { indexErrors, prepareData } from './utils';

const CreateInvoice = ({ invoice }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [out, setOut] = useState(false);
  const [errors, setErrors] = useState({});
  const items = useSelector(selectInvoiceItems);
  const portalRef = useRef(null);
  const formRef = useRef(null);
  const componentType = invoice.invoiceId ? 'edit' : 'new';

  const resetErrors = () => {
    setErrors({});
  };

  const handleAnimationEnd = () => {
    if (out) {
      setOut(false);
      setOpen(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetErrors();
    setOut(true);
  };

  useKeyDown({ keyHandlerArr: [[['Escape'], handleClose]], open });

  const submitData = async ({ reduxFunc }) => {
    resetErrors();
    const formData = new FormData(formRef.current);
    const data = prepareData({ formData, items });

    try {
      await dispatch(reduxFunc({ data, invoiceId: invoice.invoiceId }));
      handleClose();
    } catch (error) {
      const { errors: e } = error.response.data;
      if (e) {
        const indexedErrors = indexErrors({
          errors: error.response.data.errors,
          stateItems: items,
        });
        setErrors(indexedErrors);
      }
    }
  };

  const save = () => {
    submitData({ reduxFunc: patchInvoice });
  };

  const saveAndSend = () => {
    submitData({ reduxFunc: postCreateInvoice });
  };

  const saveAsDraft = () => {
    submitData({ reduxFunc: postCreateDraft });
  };

  const renderTitle = () => {
    if (componentType === 'new') {
      return 'New Invoice';
    }
    return (
      <>
        Edit
        {' '}
        <InvoiceId invoiceId={invoice.invoiceId} />
      </>
    );
  };

  const renderButtons = () => {
    if (componentType === 'new') {
      return (
        <>
          <Button onClick={handleClose} variant="7">Discard</Button>
          <Button onClick={saveAsDraft} variant="4">Save as Draft</Button>
          <Button onClick={saveAndSend} variant="2">Save &amp; Send</Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={handleClose} variant="3">Cancel</Button>
        <Button onClick={save} variant="2">Save Changes</Button>
      </>
    );
  };

  const renderCreateInvoice = () => (
    <>
      <Backdrop show={!out} />
      <Portal
        className={cx(
          'theme-bg10',
          styles.createInvoice,
          out ? styles.close : styles.open,
        )}
        id="drawer"
        onAnimationEnd={handleAnimationEnd}
        ref={portalRef}
      >
        <h2 className={cx('theme-text1', 'type-2', styles.title)}>
          {renderTitle()}
        </h2>
        <InvoiceForm
          errors={errors}
          invoice={invoice}
          ref={formRef}
          setErrors={setErrors}
        />
        <div
          className={cx(
            'theme-bg10',
            styles.buttonContainer,
            out ? styles.close : styles.open,
          )}
        >
          <div
            className={cx(
              styles.buttonWrapper,
              componentType === 'new' && styles.newButtons,
            )}
          >
            {renderButtons()}
          </div>
        </div>
      </Portal>
    </>
  );

  const renderOpenButton = () => {
    const button = (componentType === 'new'
      ? (
        <Button
          altText="New"
          aria-label="Create new invoice"
          variant="1"
        >
          New Invoice
        </Button>
      ) : <Button aria-label="Edit invoice" variant="3">Edit</Button>);
    return cloneElement(button, { onClick: handleOpen });
  };

  return (
    <>
      {renderOpenButton()}
      {open && renderCreateInvoice()}
    </>
  );
};

CreateInvoice.defaultProps = {
  invoice: {
    invoiceId: null,
  },
};

CreateInvoice.propTypes = {
  invoice: PropTypes.shape({
    invoiceId: PropTypes.string,
  }),
};

export default CreateInvoice;
