import cx from 'clsx';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Container,
  CreateInvoice,
  DeleteInvoice,
  GoBack,
  InvoiceDetailItems,
  InvoiceId,
  InvoiceStatus,
  LoadingSpinner,
  NAText,
  Time,
  Wait,
} from '..';
import { useUI } from '../../hooks';
import {
  getInvoiceDetail,
  key,
  patchStatus,
  selectInvoiceDetail,
} from '../../redux/invoiceSlice';
import currency from '../../utils/currency';
import { getDate, getDueDate } from '../../utils/date';
import grandTotal from '../../utils/grandTotal';
import styles from './InvoiceDetailPage.module.scss';

const InvoiceDetailPage = ({ invoiceId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const invoice = useSelector((s) => selectInvoiceDetail(s, invoiceId)) || {};
  const [cache, loading] = useUI({ key: key.getInvoiceDetail({ invoiceId }) });

  useEffect(() => {
    if (!cache) {
      dispatch(getInvoiceDetail({ invoiceId }));
    }
  }, [router.route]);

  if (loading) {
    return (
      <Wait milliseconds={500}>
        <div className={cx(styles.spinnerWrapper)}>
          <LoadingSpinner />
        </div>
      </Wait>
    );
  }

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
    status,
    items,
  } = invoice;

  const invoiceDate = epochDate && getDate(epochDate);
  const dueDate = epochDate && term && getDueDate({ epochDate, term });

  const changeStatus = ({ invoiceStatus }) => () => {
    dispatch(patchStatus({ invoiceId, status: invoiceStatus }));
  };

  const oppStatus = ['pending', 'draft'].includes(status) ? 'paid' : 'pending';

  return (
    <Container className={cx(styles.container)} component="main">
      <GoBack href="/invoices" />
      <div className={cx('theme-bg2', styles.statusBar)}>
        <span className={cx('theme-text2', 'type-body1', styles.statusText)}>
          Status
        </span>
        <InvoiceStatus status={status} />
        <div className={cx('theme-bg2', styles.statusButtonWrapper)}>
          {/* <Button variant="3">Edit</Button> */}
          <CreateInvoice invoice={invoice} />
          <DeleteInvoice invoiceId={invoiceId} />
          <Button
            disabled={status === 'draft'}
            onClick={changeStatus({ invoiceStatus: oppStatus })}
            variant="2"
          >
            Mark as&nbsp;
            <span className={cx(styles.oppStatus)}>{oppStatus}</span>
          </Button>
        </div>
      </div>
      <div className={cx('theme-bg2', styles.detailAndItemsContainer)}>
        <div className={cx(styles.detailWrapper)}>
          <div className={cx(styles.invoiceIdAndDescriptionWrapper)}>
            <InvoiceId
              className={cx(styles.invoiceId, 'theme-text1')}
              invoiceId={invoiceId}
            />
            <NAText
              altText="<description>"
              component="h2"
              className={cx('theme-text2', 'type-body1', styles.description)}
            >
              {description}
            </NAText>
          </div>
          <div className={cx(styles.fromAddressWrapper)}>
            <address className={cx('theme-text2', 'type-body2', styles.address)}>
              <NAText altText="<bill from street>">{fromStreet}</NAText>
              <NAText altText="<bill from city>">{fromCity}</NAText>
              <NAText altText="<bill from post code>">{fromPostCode}</NAText>
              <NAText altText="<bill from country>">{fromCountry}</NAText>
            </address>
          </div>
          <div className={cx(styles.billToWrapper)}>
            <h3 className={cx('theme-text2', 'type-body1')}>Bill To</h3>
            <NAText altText="<name>" className={cx('theme-text1', 'type-3')}>
              {name}
            </NAText>
            <address className={cx('theme-text2', 'type-body1', styles.address)}>
              <NAText altText="<bill to street>">{street}</NAText>
              <NAText altText="<bill to city>">{city}</NAText>
              <NAText altText="<bill to post code>">{postCode}</NAText>
              <NAText altText="<bill to country>">{country}</NAText>
            </address>
          </div>
          <div className={cx(styles.invoiceDateWrapper)}>
            <h3 className={cx('theme-text2', 'type-body1')}>Invoice Date</h3>
            <span className={cx('theme-text1', 'type-3')}>
              <NAText altText="<invoice date>">
                {invoiceDate && <Time date={invoiceDate} />}
              </NAText>
            </span>
          </div>
          <div className={cx(styles.dueDateWrapper)}>
            <h3 className={cx('theme-text2', 'type-body1')}>Payment Due</h3>
            <span className={cx('theme-text1', 'type-3')}>
              <NAText altText="<due date>">
                {dueDate && <Time date={dueDate} />}
              </NAText>
            </span>
          </div>
          <div className={cx(styles.sentToWrapper)}>
            <h3 className={cx('theme-text2', 'type-body1')}>Sent to</h3>
            <NAText altText="<email>" className={cx('theme-text1', 'type-3')}>
              {email}
            </NAText>
          </div>
        </div>
        <div className={cx('theme-bg9', styles.itemTotalContainer)}>
          <InvoiceDetailItems items={items} />
          {items && (
            <div className={cx('theme-bg3', styles.grandTotalContainer)}>
              <span className={cx('type-body2')}>Grand Total</span>
              <span className={cx('type-2')}>{currency(grandTotal(items))}</span>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

InvoiceDetailPage.propTypes = {
  invoiceId: PropTypes.string.isRequired,
};

export default InvoiceDetailPage;
