import React from 'react';
import Swal from 'sweetalert2';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
        <ThreadsDetail {...thread} />
      </div>
    </section>
  );
}

export default DetailThreadsPage;
