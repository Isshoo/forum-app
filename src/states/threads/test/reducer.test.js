import { describe, expect, it } from 'vitest';
import threadsReducer from '../reducer';

describe('threadsReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'threads/recieve',
      payload: {
        threads: [
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
          },
          {
            'id': 'thread-2',
            'title': 'Thread Kedua',
            'body': 'Ini adalah thread kedua',
            'category': 'General',
            'createdAt': '2021-06-21T07:00:00.000Z',
            'ownerId': 'users-2',
            'upVotesBy': [],
            'downVotesBy': [],
            'totalComments': 0
          }
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
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
    const action = {
      type: 'threads/add',
      payload: {
        thread: {
          'id': 'thread-2',
          'title': 'Thread Kedua',
          'body': 'Ini adalah thread kedua',
          'category': 'General',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'ownerId': 'users-2',
          'upVotesBy': [],
          'downVotesBy': [],
          'totalComments': 0,
        },
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with the toggled up vote thread when given by TOGGLE_UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
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
    const action = {
      type: 'threads/toggleUpVote',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);

    // action: neutralize vote thread
    const nextState2 = threadsReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });
});