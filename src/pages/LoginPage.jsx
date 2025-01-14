import React from 'react';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginAndRegister-Page/LoginInput';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        if (locale === 'EN') {
          return (
            <section className="pages-section">
              <div className="form-container">
                <h2>Login</h2>
                <LoginInput login={onLogin} />
                <p>
                  Don&apos;t have an account? <Link to="/register">Sign up here!</Link>
                </p>
              </div>
            </section>
          );
        }
        return (
          <section className="pages-section">
            <div className="form-container">
              <h2>Masuk</h2>
              <LoginInput login={onLogin} />
              <p>
                Belum punya akun? <Link to="/register">Registrasi disini!</Link>
              </p>
            </div>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

export default LoginPage;
