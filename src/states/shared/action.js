
import { getAllThreads, getThreadDetail } from '../../utils/api/threads';
import { getAllUsers } from '../../utils/api/users';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { clearThreadDetailActionCreator, receiveThreadDetailActionCreator } from '../threadDetail/action';
import api from '../../utils/api-test';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
function asyncPopulateUsersAndDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const users = await api.getAllUsers();
      const threadDetail = await api.getThreadDetail(threadId);

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { asyncPopulateUsersAndThreads, asyncPopulateUsersAndDetailThread };