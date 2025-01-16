import { register } from '../../utils/api/auth';
import { getAllUsers } from '../../utils/api/users';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async () => {
    try {
      await register({ name, email, password });
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncRecieveAllUsers() {
  return async (dispatch) => {
    try {
      const users = await getAllUsers();

      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
  asyncRecieveAllUsers,
};