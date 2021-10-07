import cx from 'clsx';
import { useRouter } from 'next/router';

import api from '../../api';
import desc from '../../api/descriptors';
import { Button, Logo } from '..';
import styles from './IndexPage.module.scss';

const IndexPage = () => {
  const router = useRouter();

  const demo = async () => {
    await api(desc.demoPostDemo());
    router.push('/invoices');
  };

  return (
    <main className={cx(styles.main)}>
      <div className={cx(styles.contentWrapper)}>
        <div className={cx(styles.logoWrapper)}>
          <Logo className={cx(styles.logo)} symmetrical />
          <h1 className={cx('type-2', 'theme-text1')}>Invoice</h1>
        </div>
        <Button className={styles.button} href="/users/login" variant="2">
          Login
        </Button>
        <Button className={styles.button} href="/users/register" variant="4">
          Register
        </Button>
        <Button className={styles.button} onClick={demo} variant="5">
          Just demo it already!
        </Button>
      </div>
    </main>
  );
};

export default IndexPage;
