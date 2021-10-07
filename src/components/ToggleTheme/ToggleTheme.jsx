import cx from 'clsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { patchTheme, selectTheme, selectUser } from '../../redux/userSlice';
import styles from './ToggleTheme.module.scss';

const ToggleTheme = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    // When logging out, Redux store is cleared triggering the `theme`
    // dependency. Make sure user exists (is logged in) before making changes
    // to `localStorage`.
    if (Object.entries(user).length) {
      // 'theme' is initially loaded in /src/pages/_app.jsx to prevent first
      // paint with the wrong theme color.
      localStorage.setItem('theme', theme);
      document.body.dataset.theme = theme;
    }
  }, [theme]);

  const handleClick = () => {
    dispatch(patchTheme({ theme: theme === 'light' ? 'dark' : 'light' }));
  };

  return (
    <button
      aria-label="Toggle theme"
      className={cx(
        styles.button,
        theme === 'light' ? styles.iconMoon : styles.iconSun,
      )}
      onClick={handleClick}
      type="button"
    />
  );
};

export default ToggleTheme;
