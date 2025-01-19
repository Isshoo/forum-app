/**
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncPopulateUsersAndThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { asyncPopulateUsersAndDetailThread, asyncPopulateUsersAndThreads } from '../action';
import { receiveThreadsActionCreator } from '../../threads/action';
import { receiveUsersActionCreator } from '../../users/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api-test';
import { clearThreadDetailActionCreator, receiveThreadDetailActionCreator } from '../../threadDetail/action';

//FAKE DATA
const fakeThreadsResponse = [
  {
    'id': 'thread-1',
    'title': 'Thread Pertama',
    'body': 'Ini adalah thread pertama',
    'category': 'General',
    'createdAt': '2021-06-21T07:00:00.000Z',
    'ownerId': 'users-1',
    'upVotesBy': [],
    'downVotesBy': [],
    'totalComments': 0,
  },
];
const threadId = 'thread-1';
const fakeThreadDetailResponse =
  {
    'id': 'thread-1',
    'title': 'Thread Pertama',
    'body': 'Ini adalah thread pertama',
    'category': 'General',
    'createdAt': '2021-06-21T07:00:00.000Z',
    'owner': {
      'id': 'users-1',
      'name': 'John Doe',
      'avatar': 'https://generated-image-url.jpg'
    },
    'upVotesBy': [],
    'downVotesBy': [],
    'comments': [
      {
        'id': 'comment-1',
        'content': 'Ini adalah komentar pertama',
        'createdAt': '2021-06-21T07:00:00.000Z',
        'owner': {
          'id': 'users-1',
          'name': 'John Doe',
          'avatar': 'https://generated-image-url.jpg'
        },
        'upVotesBy': [],
        'downVotesBy': []
      }
    ]
  };

const fakeUsersResponse = [
  {
    'id': 'john_doe',
    'name': 'John Doe',
    'email': 'john@example.com',
    'avatar': 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

// TESTS
describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    // delete backup data
    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});


describe('asyncPopulateUsersAndThreadDetail thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getThreadDetail = api.getThreadDetail;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getThreadDetail = api._getThreadDetail;

    // delete backup data
    delete api._getAllUsers;
    delete api._getThreadDetail;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getThreadDetail = () => Promise.resolve(fakeThreadDetailResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndDetailThread(threadId)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetailResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getThreadDetail = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndDetailThread('thread-1')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});