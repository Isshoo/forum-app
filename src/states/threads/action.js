const ActionType = {
  RECEIVE_THREADS: 'threads/recieve',
  ADD_THREAD: 'threads/add',
  TOGGLE_UP_VOTE_THREAD: 'threads/toggleUpVote',
  TOGGLE_DOWN_VOTE_THREAD: 'threads/toggleDownVote',
  TOGGLE_NEUTRAL_VOTE_THREAD: 'threads/toggleNeutralVote',
  RESTORE_THREAD_STATE: 'threads/restoreState',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function restoreThreadStateActionCreator(thread) {
  return {
    type: ActionType.RESTORE_THREAD_STATE,
    payload: {
      thread,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}
function toggleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}
function toggleNeutralizeVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}



export {
  ActionType,
  receiveThreadsActionCreator,
  restoreThreadStateActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  toggleNeutralizeVoteThreadActionCreator,
};