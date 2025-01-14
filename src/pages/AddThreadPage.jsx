import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import FormAddThreads from '../components/AddThread-Page/FormAddThread';
import { useNavigate } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';

function AddThreadsPage() {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  async function onAddThreadHandler(thread) {
    await addThread(thread);
    Swal.fire({
      title: 'Berhasil!',
      text: 'Catatan baru telah ditambahkan.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/');
    });
  }

  return (
    <section className="pages-section">
      <div id="formNewThreads" className="form-container">
        <h2>{locale === 'EN' ? 'New Threads' : 'Catatan Baru'}</h2>
        <FormAddThreads addThread={onAddThreadHandler} />
      </div>
    </section>
  );
}

export default AddThreadsPage;
