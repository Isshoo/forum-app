import { createThread } from '../../utils/api/threads';
import { downVoteThread, neutralizeVoteThread, upVoteThread } from '../../utils/api/threadVotes';
import { addThreadActionCreator, toggleDownVoteThreadActionCreator, toggleNeutralizeVoteThreadActionCreator, toggleUpVoteThreadActionCreator } from './action';

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    try {
      const thread = await createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await upVoteThread({ threadId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}
function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await downVoteThread({ threadId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}
function asyncNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleNeutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await neutralizeVoteThread({ threadId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

export { asyncAddThread, asyncUpVoteThread, asyncDownVoteThread, asyncNeutralizeVoteThread };