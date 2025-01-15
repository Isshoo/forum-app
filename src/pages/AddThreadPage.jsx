import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import FormAddThreads from '../components/AddThread-Page/FormAddThread';
import { useNavigate } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import { asyncAddThread } from '../states/threads/thunk';
import { useDispatch } from 'react-redux';

function AddThreadsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { locale } = useContext(LocaleContext);

  function onAddThreadHandler(thread) {
    dispatch(asyncAddThread(thread));
    Swal.fire({
      title: 'Berhasil!',
      text: 'Thread baru telah ditambahkan.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/');
    });
  }

  return (
    <section className="pages-section">
      <div id="formNewThreads" className="form-container">
        <h2>{locale === 'EN' ? 'New Threads' : 'Thread Baru'}</h2>
        <FormAddThreads addThread={onAddThreadHandler} />
      </div>
    </section>
  );
}

export default AddThreadsPage;
