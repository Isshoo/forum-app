const ActionType = {
  RECEIVE_THREAD_DETAIL: 'threadDetail/recieve',
  CLEAR_THREAD_DETAIL: 'threadDetail/clear',
  ADD_COMMENT: 'comments/add',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'threadDetail/toggleUpVote',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'threadDetail/toggleDownVote',
  TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL: 'threadDetail/toggleNeutralVote',
  TOGGLE_UP_VOTE_COMMENT: 'comments/toggleUpVote',
  TOGGLE_DOWN_VOTE_COMMENT: 'comments/toggleDownVote',
  TOGGLE_NEUTRAL_VOTE_COMMENT: 'comments/toggleNeutralVote',
  RESTORE_COMMENT_STATE: 'comments/restoreState',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleNeutralizeVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleNeutralizeVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function restoreCommentStateActionCreator(comment) {
  return {
    type: ActionType.RESTORE_COMMENT_STATE,
    payload: {
      comment,
    },
  };
}



export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleNeutralizeVoteThreadDetailActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  toggleNeutralizeVoteCommentActionCreator,
  restoreCommentStateActionCreator,
};