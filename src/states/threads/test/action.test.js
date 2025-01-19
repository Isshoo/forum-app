import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import api from '../../../utils/api-test';
import { asyncAddThread, asyncDownVoteThread, asyncNeutralizeVoteThread, asyncUpVoteThread } from '../thunk';
import { addThreadActionCreator, restoreThreadStateActionCreator, toggleDownVoteThreadActionCreator, toggleNeutralizeVoteThreadActionCreator, toggleUpVoteThreadActionCreator } from '../action';

const fakeNewThread = {
  'title': 'Thread Pertama',
  'body': 'Ini adalah thread pertama',
  'category': 'General',
};
const fakeNewThreadResponse = {
  'id': 'thread-1',
  'title': 'Thread Pertama',
  'body': 'Ini adalah thread pertama',
  'category': 'General',
  'createdAt': '2021-06-21T07:00:00.000Z',
  'ownerId': 'users-1',
  'upVotesBy': [],
  'downVotesBy': [],
  'totalComments': 0
};
const authUser = {
  'id': 'user-1',
  'name': 'John Doe',
  'email': 'john@example.com',
  'avatar': 'https://generated-image-url.jpg'
};
const threadId = 'thread-1';
const threads = [
  {
    'id': 'thread-1',
    'title': 'Thread Pertama',
    'body': 'Ini adalah thread pertama',
    'category': 'General',
    'createdAt': '2021-06-21T07:00:00.000Z',
    'ownerId': 'users-1',
    'upVotesBy': [],
    'downVotesBy': [],
    'totalComments': 0
  }
];
const fakeUpVote = {
  'id': 'vote-1',
  'userId': 'users-1',
  'threadId': 'thread-1',
  'voteType': 1
};
const fakeDownVote = {
  'id': 'vote-1',
  'userId': 'users-1',
  'threadId': 'thread-1',
  'voteType': -1
};
const fakeNeutralizeVote = {
  'id': 'vote-1',
  'userId': 'users-1',
  'threadId': 'thread-1',
  'voteType': 0
};

const previousState = threads.find((thread) => thread.id === threadId);
const fakeError = new Error('Ups, something went wrong');

const getState = () => ({ authUser, threads });
const dispatch = vi.fn();


describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api._createThread = api.createThread;

    // delete backup data
    delete api._createThread;
  });

  it('should dispatch addThreadActionCreator when adding thread succeeds', async () => {
    // Arrange
    api.createThread = () => Promise.resolve(fakeNewThreadResponse);
    // Act
    await asyncAddThread(fakeNewThread)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeNewThreadResponse));
  });

  it('should return error when adding thread fails', async () => {
    // Arrange
    api.createThread = () => Promise.reject(fakeError);
    // Act
    const result = await asyncAddThread(fakeNewThread)(dispatch);

    // Assert
    expect(result).toEqual({ success: false, message: fakeError.message });
  });
});

describe('asyncUpVoteThread thunk', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
  });

  afterEach(() => {
    api._upVoteThread = api.upVoteThread;

    // delete backup data
    delete api._upVoteThread;
  });

  it('should dispatch toggleUpVoteThreadActionCreator and call API when upvoting thread succeeds', async () => {
    // Arrange
    api.upVoteThread = () => Promise.resolve(fakeUpVote);

    // Act
    await asyncUpVoteThread(threadId)(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
  });

  it('should restore previous state and call alert when upvoting thread fails', async () => {
    // Arrange
    api.upVoteThread = () => Promise.reject(fakeError);
    window.alert = vi.fn();

    // Act
    await asyncUpVoteThread(threadId)(dispatch, getState);

    // Assert
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(restoreThreadStateActionCreator(previousState));
  });
});

describe('asyncDownVoteThread thunk', () => {
  beforeEach(() => {
    api._downVoteThread = api.downVoteThread;
  });

  afterEach(() => {
    api._downVoteThread = api.downVoteThread;

    // delete backup data
    delete api._downVoteThread;
  });
  it('should dispatch toggleDownVoteThreadActionCreator and call API when downvoting thread succeeds', async () => {

    api.downVoteThread = () => Promise.resolve(fakeDownVote);

    await asyncDownVoteThread(threadId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
  });

  it('should restore previous state and call alert when downvoting thread fails', async () => {

    api.downVoteThread = () => Promise.reject(fakeError);
    window.alert = vi.fn();

    await asyncDownVoteThread(threadId)(dispatch, getState);

    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(restoreThreadStateActionCreator(previousState));
  });
});

describe('asyncNeutralizeVoteThread thunk', () => {
  beforeEach(() => {
    api._neutralizeVoteThread = api.neutralizeVoteThread;
  });

  afterEach(() => {
    api._neutralizeVoteThread = api.neutralizeVoteThread;

    // delete backup data
    delete api._neutralizeVoteThread;
  });
  it('should dispatch toggleNeutralizeVoteThreadActionCreator and call API when neutralizing vote succeeds', async () => {
    // Arrange
    api.neutralizeVoteThread = () => Promise.resolve(fakeNeutralizeVote);

    // Act
    await asyncNeutralizeVoteThread(threadId)(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }));
  });

  it('should restore previous state and call alert when neutralizing vote fails', async () => {
    // Arrange
    api.neutralizeVoteThread = () => Promise.reject(fakeError);
    window.alert = vi.fn();

    // Act
    await asyncNeutralizeVoteThread(threadId)(dispatch, getState);

    // Assert
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(restoreThreadStateActionCreator(previousState));
  });
});
