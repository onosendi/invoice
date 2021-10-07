import cx from 'clsx';

import { Logo, Logout, ToggleTheme } from '..';
import styles from './AppBar.module.scss';

const AppBar = () => (
  <header className={cx(styles.appBar, 'theme-bg6')}>
    <Logo symmetrical={false} />
    <div className={styles.themeToggleContainer}>
      <ToggleTheme />
    </div>
    <div className={styles.userContainer}>
      <Logout />
    </div>
  </header>
);

export default AppBar;
