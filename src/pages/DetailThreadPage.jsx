import React, { useRef } from 'react';
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncAddComment,
  asyncDownVoteComment,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteComment,
  asyncNeutralizeVoteThreadDetail,
  asyncReceiveThreadDetail,
  asyncUpVoteComment,
  asyncUpVoteThreadDetail,
} from '../states/threadDetail/thunk';
import { asyncRecieveAllUsers } from '../states/users/action';
import ThreadDetail from '../components/DetailThread-Page/ThreadDetail';
import CommentSection from '../components/DetailThread-Page/CommentSection';
import Loading from '../components/Base/LoadingBar';
import Swal from 'sweetalert2';

function DetailThreadsPage() {
  const firstRun = useRef(true);
  const { id } = useParams();
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

  const onUpVote = () => dispatch(asyncUpVoteThreadDetail());
  const onDownVote = () => dispatch(asyncDownVoteThreadDetail());
  const onNeutralizeVote = () => dispatch(asyncNeutralizeVoteThreadDetail());
  const onUpVoteComment = (commentId) => dispatch(asyncUpVoteComment(commentId));
  const onDownVoteComment = (commentId) => dispatch(asyncDownVoteComment(commentId));
  const onNeutralizeVoteComment = (commentId) => dispatch(asyncNeutralizeVoteComment(commentId));

  const onAddComment = async (content) => {
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
  };

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
