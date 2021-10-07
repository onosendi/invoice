import cx from 'clsx';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import api from '../../api';
import desc from '../../api/descriptors';
import { Button, CustomLink, TextField } from '..';
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  const router = useRouter();
  const textFieldRef = useRef({});
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { usernameRef, passwordRef, passwordConfirmRef } = textFieldRef.current;

    try {
      await api(desc.usersPostRegister({
        username: usernameRef.value,
        password: passwordRef.value,
        passwordConfirm: passwordConfirmRef.value,
      }));
      router.push('/invoices');
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const handleRef = ({ el, name }) => {
    textFieldRef.current[name] = el;
  };

  return (
    <main className={cx(styles.main)}>
      <div className={cx(styles.wrapper)}>
        <div className={cx('theme-input-stroke', styles.formContainer)}>
          <h1 className={cx('type-2', 'theme-text1')}>Register</h1>
          <form
            className={cx(styles.form)}
            onSubmit={handleSubmit}
          >
            <TextField
              error={!!errors.username}
              helperText={errors?.username?.msg}
              id="username"
              label="Username"
              name="username"
              ref={(el) => { handleRef({ el, name: 'usernameRef' }); }}
            />
            <TextField
              error={!!errors.password}
              helperText={errors?.password?.msg}
              id="password"
              label="Password"
              name="password"
              ref={(el) => { handleRef({ el, name: 'passwordRef' }); }}
              type="password"
            />
            <TextField
              error={!!errors.passwordConfirm}
              helperText={errors?.passwordConfirm?.msg}
              id="passwordConfirm"
              label="Confirm Password"
              name="passwordConfirm"
              ref={(el) => { handleRef({ el, name: 'passwordConfirmRef' }); }}
              type="password"
            />
            <Button type="submit" variant="2">Register</Button>
          </form>
        </div>
        <p className={cx('type-body1', 'theme-text2')}>
          Already registered?
          {' '}
          <CustomLink
            className={cx('type-body1')}
            href="/users/login"
          >
            Login
          </CustomLink>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
