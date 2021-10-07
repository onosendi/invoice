import cx from 'clsx';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Backdrop,
  Button,
  InvoiceId,
  Portal,
} from '..';
import { useKeyDown } from '../../hooks';
import { deleteInvoice } from '../../redux/invoiceSlice';
import styles from './DeleteInvoice.module.scss';

const DeleteInvoice = ({ invoiceId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [out, setOut] = useState(false);
  const portalRef = useRef(null);

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
    setOut(true);
  };

  const handleDeleteInvoice = async () => {
    await dispatch(deleteInvoice({ invoiceId }));
    handleClose();
    router.push('/invoices');
  };

  useKeyDown({ keyHandlerArr: [[['Escape'], handleClose]], open });

  const renderModal = () => (
    <>
      <Backdrop show={!out} />
      <Portal
        className={cx(
          styles.deleteInvoiceWrapper,
          out ? styles.close : styles.open,
        )}
        id="deleteInvoice"
        onAnimationEnd={handleAnimationEnd}
        ref={portalRef}
      >
        <div className={cx('theme-bg2', styles.deleteInvoice)}>
          <span className={cx('theme-text1', 'type-2')}>
            Confirm Deletion
          </span>
          <p className={cx('theme-text2', 'type-body1')}>
            Are you sure you want to delete invoice
            {' '}
            <InvoiceId invoiceId={invoiceId} />
            ? This action cannot be undone.
          </p>
          <div className={cx(styles.buttonWrapper)}>
            <Button variant="3" onClick={handleClose}>Cancel</Button>
            <Button variant="5" onClick={handleDeleteInvoice}>Delete</Button>
          </div>
        </div>
      </Portal>
    </>
  );

  return (
    <>
      <Button onClick={handleOpen} variant="5">Delete</Button>
      {open && renderModal()}
    </>
  );
};

DeleteInvoice.propTypes = {
  invoiceId: PropTypes.string.isRequired,
};

export default DeleteInvoice;
