import cx from 'clsx';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { postLogout, selectUser } from '../../redux/userSlice';
import styles from './Logout.module.scss';

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  const handleClick = () => {
    dispatch(postLogout({ user, router }));
  };

  return (
    <button
      aria-label="logout"
      className={cx(styles.logout)}
      onClick={handleClick}
      type="button"
    />
  );
};

export default Logout;
