import api from '../../utils/api-test';
import {
  addThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  toggleNeutralizeVoteThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  restoreThreadStateActionCreator
} from './action';

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const previousState = threads.find((thread) => thread.id === threadId);
    dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.upVoteThread({ threadId });
    } catch (error) {
      alert(error.message);
      dispatch(restoreThreadStateActionCreator(previousState));
    }
  };
}
function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const previousState = threads.find((thread) => thread.id === threadId);
    dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.downVoteThread({ threadId });
    } catch (error) {
      alert(error.message);
      dispatch(restoreThreadStateActionCreator(previousState));
    }
  };
}
function asyncNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const previousState = threads.find((thread) => thread.id === threadId);
    dispatch(toggleNeutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralizeVoteThread({ threadId });
    } catch (error) {
      alert(error.message);
      dispatch(restoreThreadStateActionCreator(previousState));

    }
  };
}


export { asyncAddThread, asyncUpVoteThread, asyncDownVoteThread, asyncNeutralizeVoteThread };