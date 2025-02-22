import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import FormAddThreads from '../components/AddThread-Page/FormAddThread';
import { useNavigate } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import { asyncAddThread } from '../states/threads/thunk';
import { useDispatch } from 'react-redux';
import Pages from '../components/styled/Pages';

function AddThreadsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { locale } = useContext(LocaleContext);

  const onAddThreadHandler = async (thread) => {
    const result = await dispatch(asyncAddThread(thread));

    if (result.success) {
      Swal.fire({
        title: 'Berhasil!',
        text: 'Thread baru telah ditambahkan.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/');
      });
    } else {
      Swal.fire({
        title: 'Gagal!',
        text: result.message || 'Terjadi kesalahan saat menambahkan thread.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Pages>
      <div id="formNewThreads" className="form-container">
        <h2>{locale === 'EN' ? 'New Threads' : 'Thread Baru'}</h2>
        <FormAddThreads addThread={onAddThreadHandler} locale={locale} />
      </div>
    </Pages>
  );
}

export default AddThreadsPage;
