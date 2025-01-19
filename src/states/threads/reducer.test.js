import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';

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

  it('should return the threads with the toggled down vote thread when given by TOGGLE_DOWN_VOTE_THREAD action', () => {
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
      type: 'threads/toggleDownVote',
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
        downVotesBy: [action.payload.userId],
      },
    ]);

    // action: neutralize vote thread
    const nextState2 = threadsReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the up vote thread with the toggled neutral vote thread when given by TOGGLE_NEUTRALIZE_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        'id': 'thread-1',
        'title': 'Thread Pertama',
        'body': 'Ini adalah thread pertama',
        'category': 'General',
        'createdAt': '2021-06-21T07:00:00.000Z',
        'ownerId': 'users-1',
        'upVotesBy': ['user-1'],
        'downVotesBy': [],
        'totalComments': 0,
      },
    ];
    const action = {
      type: 'threads/toggleNeutralVote',
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
        upVotesBy: [],
      },
    ]);
  });

  it('should return the down vote thread with the toggled neutral vote thread when given by TOGGLE_NEUTRALIZE_VOTE_THREAD action', () => {
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
        'downVotesBy': ['user-1'],
        'totalComments': 0,
      },
    ];
    const action = {
      type: 'threads/toggleNeutralVote',
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
        downVotesBy: [],
      },
    ]);
  });

  it('should return the down vote thread with the toggled up vote thread when given by TOGGLE_UP_VOTE_THREAD action', () => {
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
        'downVotesBy': ['user-1'],
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
        downVotesBy: [],
      },
    ]);
  });

  it('should return the up vote thread with the toggled down vote thread when given by TOGGLE_DOWN_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        'id': 'thread-1',
        'title': 'Thread Pertama',
        'body': 'Ini adalah thread pertama',
        'category': 'General',
        'createdAt': '2021-06-21T07:00:00.000Z',
        'ownerId': 'users-1',
        'upVotesBy': ['user-1'],
        'downVotesBy': [],
        'totalComments': 0,
      },
    ];
    const action = {
      type: 'threads/toggleDownVote',
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
        upVotesBy: [],
        downVotesBy: [action.payload.userId],
      },
    ]);
  });

  it('should return the previous state when given by RESTORE_THREAD_STATE action', () => {
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
        'downVotesBy': ['user-1'],
        'totalComments': 0,
      },
    ];
    const previousState = initialState.find((thread) => thread.id === 'thread-1');

    const toggleAction = {
      type: 'threads/toggleUpVote',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadsReducer(initialState, toggleAction);
    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [toggleAction.payload.userId],
        downVotesBy: [],
      },
    ]);

    const restoreAction = {
      type: 'threads/restoreState',
      payload: {
        thread: previousState,
      },
    };

    // action: restore thread state
    const restoredState = threadsReducer(nextState, restoreAction);
    // assert
    expect(restoredState).toEqual([
      {
        ...initialState[0],
      },
    ]);
  });
});