import React, { useRef } from 'react';
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveThreadDetail } from '../states/threadDetail/thunk';
import { asyncRecieveAllUsers } from '../states/users/action';
import ThreadDetail from '../components/DetailThread-Page/ThreadDetail';
import CommentSection from '../components/DetailThread-Page/CommentSection';
import Loading from '../components/Base/LoadingBar';

function DetailThreadsPage() {
  const firstRun = useRef(true);
  const { id } = useParams();
  const { locale } = useContext(LocaleContext);
  const threadDetail = useSelector((states) => states.threadDetail || {});
  const authUser = useSelector((states) => states.authUser || {});
  const allUsers = useSelector((states) => states.users || []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncReceiveThreadDetail(id));
      dispatch(asyncRecieveAllUsers());
      firstRun.current = false;
    }
  }, [id, dispatch]);

  const owner = threadDetail?.owner
    ? allUsers.find((user) => user.id === threadDetail.owner.id)
    : null;

  if (!threadDetail || !threadDetail.owner || !allUsers.length) {
    return <Loading />;
  }

  return (
    <section className="pages-section">
      <div className="detail-con">
        <ThreadDetail
          title={threadDetail.title}
          body={threadDetail.body}
          category={threadDetail.category}
          createdAt={threadDetail.createdAt}
          owner={owner}
          upVotesBy={threadDetail.upVotesBy}
          downVotesBy={threadDetail.downVotesBy}
          authUser={authUser.id}
          allUsers={allUsers}
        />
        <CommentSection />
      </div>
    </section>
  );
}

export default DetailThreadsPage;
