
import { getAllThreads } from '../../utils/api/threads';
import { getAllUsers } from '../../utils/api/users';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndTalks() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await getAllUsers();
      const threads = await getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { asyncPopulateUsersAndTalks };