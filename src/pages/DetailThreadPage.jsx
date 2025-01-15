import React, { useRef } from 'react';
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveThreadDetail } from '../states/threadDetail/thunk';

function DetailThreadsPage() {
  const firstRun = useRef(true);
  const { id } = useParams();
  const { locale } = useContext(LocaleContext);
  const threadDetail = useSelector((states) => states.threadDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncReceiveThreadDetail(id));
      firstRun.current = false;
    }
  }, [id, dispatch]);

  if (!threadDetail) {
    return (
      <p className="blank-thread">
        {locale === 'EN' ? 'Thread is not found!' : 'Catatan tidak ditemukan!'}
      </p>
    );
  }

  return (
    <section className="pages-section">
      <div className="detail-con">
        <div>ini detail thread</div>
        <div>{threadDetail.title}</div>
      </div>
    </section>
  );
}

export default DetailThreadsPage;
