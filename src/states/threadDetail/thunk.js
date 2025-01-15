import { createComment } from '../../utils/api/comments';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { downVoteComment, neutralizeVoteComment, upVoteComment } from '../../utils/api/commentVotes';
import { getThreadDetail } from '../../utils/api/threads';
import { downVoteThread, neutralizeVoteThread, upVoteThread } from '../../utils/api/threadVotes';
import { addCommentActionCreator, clearThreadDetailActionCreator, receiveThreadDetailActionCreator, toggleDownVoteCommentActionCreator, toggleDownVoteThreadDetailActionCreator, toggleNeutralizeVoteCommentActionCreator, toggleNeutralizeVoteThreadDetailActionCreator, toggleUpVoteCommentActionCreator, toggleUpVoteThreadDetailActionCreator } from './action';

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddComment({ content }){
  return async (dispatch, getState) => {
    const { threadDetail } = getState();

    try {
      const comment = await createComment({ threadId: threadDetail.id, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));

    try {
      await upVoteThread({ threadId: threadDetail.id });
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));

    try {
      await downVoteThread({ threadId: threadDetail.id });
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncNeutralizeVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleNeutralizeVoteThreadDetailActionCreator(authUser.id));

    try {
      await neutralizeVoteThread({ threadId: threadDetail.id });
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await upVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await downVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncNeutralizeVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleNeutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await neutralizeVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

export {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
};