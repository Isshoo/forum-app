import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  addCommentActionCreator,
  clearThreadDetailActionCreator,
  receiveThreadDetailActionCreator,
  restoreCommentStateActionCreator,
  toggleDownVoteCommentActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleNeutralizeVoteCommentActionCreator,
  toggleNeutralizeVoteThreadDetailActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleUpVoteThreadDetailActionCreator
} from './action';
import api from '../../utils/api-test';

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
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
      const comment = await api.createComment({ threadId: threadDetail.id, content });
      dispatch(addCommentActionCreator(comment));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
}

function asyncUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const previousState = { ...threadDetail };
    dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.upVoteThread({ threadId: threadDetail.id });
    } catch (error) {
      alert(error.message);
      dispatch(receiveThreadDetailActionCreator(previousState));
    }
  };
}

function asyncDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const previousState = { ...threadDetail };
    dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.downVoteThread({ threadId: threadDetail.id });
    } catch (error) {
      alert(error.message);
      dispatch(receiveThreadDetailActionCreator(previousState));
    }
  };
}

function asyncNeutralizeVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const previousState = { ...threadDetail };
    dispatch(toggleNeutralizeVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.neutralizeVoteThread({ threadId: threadDetail.id });
    } catch (error) {
      alert(error.message);
      dispatch(receiveThreadDetailActionCreator(previousState));
    }
  };
}

function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const previousComment = threadDetail.comments.find((comment) => comment.id === commentId);
    dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.upVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(restoreCommentStateActionCreator(previousComment));
    }
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const previousComment = threadDetail.comments.find((comment) => comment.id === commentId);
    dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.downVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(restoreCommentStateActionCreator(previousComment));
    }
  };
}

function asyncNeutralizeVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const previousComment = threadDetail.comments.find((comment) => comment.id === commentId);
    dispatch(toggleNeutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.neutralizeVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(restoreCommentStateActionCreator(previousComment));
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