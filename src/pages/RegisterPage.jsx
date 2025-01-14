import React from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/LoginAndRegister-Page/RegisterInput';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    Swal.fire({
      title: 'Berhasil!',
      text: 'Akun berhasil diregistrasi, silahkan login.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/');
    });
    navigate('/');
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        if (locale === 'EN') {
          return (
            <section className="pages-section">
              <div className="form-container">
                <h2>Register</h2>
                <RegisterInput register={onRegister} />
                <p>
                  Already have an account? <Link to="/">Login here!</Link>
                </p>
              </div>
            </section>
          );
        }
        return (
          <section className="pages-section">
            <div className="form-container">
              <h2>Registrasi</h2>
              <RegisterInput register={onRegister} />
              <p>
                Sudah punya akun? <Link to="/">Masuk disini!</Link>
              </p>
            </div>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

export default RegisterPage;
