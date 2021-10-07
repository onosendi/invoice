import cx from 'clsx';

import {
  Container,
  CreateInvoice,
  FilterInvoices,
  FilterInvoiceText,
  InvoiceList,
} from '..';
import styles from './InvoicesPage.module.scss';

const InvoicesPage = () => (
  <Container className={cx(styles.container)} component="main">
    <header className={cx(styles.header)}>
      <div>
        <h2 className={cx('theme-text1')}>Invoices</h2>
        <FilterInvoiceText />
      </div>
      <FilterInvoices />
      <CreateInvoice />
    </header>
    <InvoiceList />
  </Container>
);

export default InvoicesPage;
