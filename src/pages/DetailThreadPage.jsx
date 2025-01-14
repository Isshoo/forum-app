import React from 'react';
import Swal from 'sweetalert2';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getThread, deleteThread, archiveThread, unarchiveThread } from '../utils/network-data';
import ThreadsDetail from '../components/DetailThread-Page/ThreadDetail';
import LocaleContext from '../contexts/LocaleContext';
import LoadingBar from '../components/Base/LoadingBar';

function DetailThreadsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchThreadData() {
      const { data } = await getThread(id);
      setThread(data);
      setLoading(false);
    }

    fetchThreadData();

    return () => {
      setThread(null);
    };
  }, [id]);

  async function onDeleteHandler(id) {
    try {
      const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Catatan ini akan dihapus secara permanen.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
      });

      if (!result.isConfirmed) {
        return;
      }

      await deleteThread(id);

      await Swal.fire({
        title: 'Berhasil!',
        text: 'Catatan telah dihapus.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      navigate('/');
    } catch (error) {
      console.error('Error saat menghapus catatan:', error);

      await Swal.fire({
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat menghapus catatan. Silakan coba lagi.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  async function onArchivingHandler(id) {
    await archiveThread(id);
    navigate('/archived');
  }

  async function onUnarchivingHandler(id) {
    await unarchiveThread(id);
    navigate('/');
  }
  if (loading) {
    return <LoadingBar />;
  }

  if (!thread) {
    return (
      <p className="blank-thread">
        {locale === 'EN' ? 'Thread is not found!' : 'Catatan tidak ditemukan!'}
      </p>
    );
  }

  return (
    <section className="pages-section">
      <div className="detail-con">
        <ThreadsDetail
          {...thread}
          onDelete={onDeleteHandler}
          onArchive={thread.archived ? onUnarchivingHandler : onArchivingHandler}
        />
      </div>
    </section>
  );
}

export default DetailThreadsPage;
