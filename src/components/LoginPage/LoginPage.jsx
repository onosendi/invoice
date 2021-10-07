import cx from 'clsx';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import api from '../../api';
import desc from '../../api/descriptors';
import { Button, CustomLink, TextField } from '..';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const router = useRouter();
  const textFieldRef = useRef({});
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = textFieldRef.current;

    try {
      setError(false);
      await api(desc.usersPostLogin({
        username: username.value,
        password: password.value,
      }));
      router.push('/invoices');
    } catch {
      setError(true);
    }
  };

  const handleRef = ({ el, name }) => {
    textFieldRef.current[name] = el;
  };

  return (
    <main className={cx(styles.main)}>
      <div className={cx(styles.wrapper)}>
        <div className={cx('theme-input-stroke', styles.formContainer)}>
          <header className={cx(styles.header)}>
            <h1 className={cx('type-2', 'theme-text1')}>Login</h1>
            {!!error && (
              <span className={cx('type-body2', styles.error)}>
                Invalid username or password
              </span>
            )}
          </header>
          <form
            className={cx(styles.form)}
            noValidate
            onSubmit={handleSubmit}
          >
            <TextField
              id="username"
              label="Username"
              name="username"
              ref={(el) => { handleRef({ el, name: 'username' }); }}
            />
            <TextField
              id="password"
              label="Password"
              name="password"
              ref={(el) => { handleRef({ el, name: 'password' }); }}
              type="password"
            />
            <Button type="submit" variant="2">Login</Button>
          </form>
        </div>
        <p className={cx('type-body1', 'theme-text2')}>
          Not registered?
          {' '}
          <CustomLink
            className={cx('type-body1')}
            href="/users/register"
          >
            Register
          </CustomLink>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
