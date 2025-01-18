import React, { useCallback, useMemo, useRef } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  asyncAddComment,
  asyncDownVoteComment,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteComment,
  asyncNeutralizeVoteThreadDetail,
  asyncUpVoteComment,
  asyncUpVoteThreadDetail,
} from '../states/threadDetail/thunk';
import ThreadDetail from '../components/DetailThread-Page/ThreadDetail';
import CommentSection from '../components/DetailThread-Page/CommentSection';
import Loading from '../components/Base/LoadingBar';
import Swal from 'sweetalert2';
import { asyncPopulateUsersAndDetailThread } from '../states/shared/action';

function DetailThreadsPage() {
  const firstRun = useRef(true);
  const { id } = useParams();
  const { threadDetail, users, authUser } = useSelector(
    (states) => ({
      threadDetail: states.threadDetail,
      users: states.users,
      authUser: states.authUser,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncPopulateUsersAndDetailThread(id));
      firstRun.current = false;
    }
  }, [id, dispatch]);

  const owner = useMemo(() => {
    if (threadDetail && threadDetail.owner && users.length > 0) {
      return users.find((user) => user.id === threadDetail.owner.id);
    }
    return null;
  }, [threadDetail, users]);

  const onUpVote = useCallback(() => dispatch(asyncUpVoteThreadDetail()), [dispatch]);
  const onDownVote = useCallback(() => dispatch(asyncDownVoteThreadDetail()), [dispatch]);
  const onNeutralizeVote = useCallback(
    () => dispatch(asyncNeutralizeVoteThreadDetail()),
    [dispatch]
  );
  const onUpVoteComment = useCallback(
    (commentId) => dispatch(asyncUpVoteComment(commentId)),
    [dispatch]
  );
  const onDownVoteComment = useCallback(
    (commentId) => dispatch(asyncDownVoteComment(commentId)),
    [dispatch]
  );
  const onNeutralizeVoteComment = useCallback(
    (commentId) => dispatch(asyncNeutralizeVoteComment(commentId)),
    [dispatch]
  );

  // Add comment handler
  const onAddComment = useCallback(
    async (content) => {
      const result = await dispatch(asyncAddComment({ content }));

      if (result.success) {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Komentar berhasil ditambahkan.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Gagal!',
          text: result.message || 'Terjadi kesalahan saat menambahkan komentar.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },
    [dispatch]
  );

  if (!threadDetail || !threadDetail.owner || !users.length || !owner) {
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
          allUsers={users}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralizeVote={onNeutralizeVote}
        />
        <CommentSection
          comments={threadDetail.comments}
          authUser={authUser.id}
          onAddComment={onAddComment}
          onUpVoteComment={onUpVoteComment}
          onDownVoteComment={onDownVoteComment}
          onNeutralizeVoteComment={onNeutralizeVoteComment}
        />
      </div>
    </section>
  );
}

export default DetailThreadsPage;
