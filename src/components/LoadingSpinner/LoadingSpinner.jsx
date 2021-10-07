import cx from 'clsx';

import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => (
  <div className={cx(styles.wrapper)}>
    <div className={cx(styles.ldsSpinner)}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default LoadingSpinner;
