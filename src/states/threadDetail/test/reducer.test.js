/**
* test scenario for threadDetailReducer
*
* - threadDetailReducer function
*  - should return the initial state when given by unknown action
*  - should return the thread detail when given by RECEIVE_THREAD_DETAIL action
*  - should clear the thread detail when given by CLEAR_THREAD_DETAIL action
*  - should return the thread detail comments with the new comment when given by ADD_COMMENT action
*  - should return the thread detail with the toggled up vote thread when given by TOGGLE_UP_VOTE_THREAD_DETAIL action
*  - should return the thread detail with the toggled down vote thread when given by TOGGLE_DOWN_VOTE_THREAD_DETAIL action
*  - should return the up voted thread detail with the toggled neutral vote thread when given by TOGGLE_NEUTRALIZE_VOTE_THREAD_DETAIL action
*  - should return the down voted thread detail with the toggled neutral vote thread when given by TOGGLE_NEUTRALIZE_VOTE_THREAD_DETAIL action
*  - should return the down voted thread detail with the toggled up voted thread when given by TOGGLE_UP_VOTE_THREAD_DETAIL action
*  - should return the up voted thread detail with the toggled down vote thread when given by TOGGLE_DOWN_VOTE_THREAD_DETAIL action
*  - should return the previous state when given by RESTORE_THREAD_STATE action
*  - should return the comments with the toggled up vote comment when given by TOGGLE_UP_VOTE_COMMENT action
*  - should return the comments with the toggled down vote comment when given by TOGGLE_DOWN_VOTE_COMMENT action
*  - should return the up voted comment with the toggled neutral vote comment when given by TOGGLE_NEUTRALIZE_VOTE_COMMENT action
*  - should return the down voted comment with the toggled neutral vote comment when given by TOGGLE_NEUTRALIZE_VOTE_COMMENT action
*  - should return the down voted comment with the toggled up voted comment when given by TOGGLE_UP_VOTE_COMMENT action
*  - should return the up voted comment with the toggled down vote comment when given by TOGGLE_DOWN_VOTE_COMMENT action
*  - should return the previous state when given by RESTORE_COMMENT_STATE action
*
*/

import { describe, expect, it } from 'vitest';
import threadDetailReducer from '../reducer';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = {};
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread detail when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {};
    const action = {
      type: 'threadDetail/recieve',
      payload: {
        threadDetail: {
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
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should clear the thread detail when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
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
    const action = {
      type: 'threadDetail/clear',
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it('should return the thread detail comments with the new comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = {
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
      'comments': []
    };

    const action = {
      type: 'comments/add',
      payload: {
        comment: {
          'id': 'comment-1',
          'content': 'Ini adalah komentar pertama',
          'createdAt': '2021-06-21T07:00:00.000Z',
          'upVotesBy': [],
          'downVotesBy': [],
          'owner': {
            'id': 'users-1',
            'name': 'John Doe',
            'email': 'john@example.com'
          }
        },
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment]
    });
  });

  it('should return the thread detail with the toggled up vote thread when given by TOGGLE_UP_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
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
    const action = {
      type: 'threadDetail/toggleUpVote',
      payload: {
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        upVotesBy: [action.payload.userId],
      },
    );

    // action: neutralize vote thread
    const nextState2 = threadDetailReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the thread detail with the toggled down vote thread when given by TOGGLE_DOWN_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
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
    const action = {
      type: 'threadDetail/toggleDownVote',
      payload: {
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        downVotesBy: [action.payload.userId],
      },
    );

    // action: neutralize vote thread
    const nextState2 = threadDetailReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the up voted thread detail with the toggled neutral vote thread when given by TOGGLE_NEUTRALIZE_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
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
      'upVotesBy': ['user-1'],
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
    const action = {
      type: 'threadDetail/toggleNeutralVote',
      payload: {
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        upVotesBy: [],
      },
    );
  });

  it('should return the down voted thread detail with the toggled neutral vote thread when given by TOGGLE_NEUTRALIZE_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
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
      'downVotesBy': ['user-1'],
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
    const action = {
      type: 'threadDetail/toggleNeutralVote',
      payload: {
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        downVotesBy: [],
      },
    );
  });

  it('should return the down voted thread detail with the toggled up voted thread when given by TOGGLE_UP_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
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
      'downVotesBy': ['user-1'],
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
    const action = {
      type: 'threadDetail/toggleUpVote',
      payload: {
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        upVotesBy: [action.payload.userId],
        downVotesBy: [],
      },
    );
  });

  it('should return the up voted thread detail with the toggled down vote thread when given by TOGGLE_DOWN_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
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
      'upVotesBy': ['user-1'],
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
    const action = {
      type: 'threadDetail/toggleDownVote',
      payload: {
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        upVotesBy: [],
        downVotesBy: [action.payload.userId],
      },
    );
  });

  it('should return the previous state when given by RESTORE_THREAD_STATE action', () => {
    // arrange
    const initialState = {
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
      'downVotesBy': ['user-1'],
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
    const previousState = { ...initialState };

    const toggleAction = {
      type: 'threadDetail/toggleUpVote',
      payload: {
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, toggleAction);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        upVotesBy: [toggleAction.payload.userId],
        downVotesBy: [],
      },
    );

    const restoreAction = {
      type: 'threadDetail/recieve',
      payload: {
        threadDetail: previousState,
      },
    };

    // action: restore thread state
    const restoredState = threadDetailReducer(nextState, restoreAction);
    // assert
    expect(restoredState).toEqual(
      {
        ...initialState
      },
    );
  });

  it('should return the comments with the toggled up vote comment when given by TOGGLE_UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
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
    const action = {
      type: 'comments/toggleUpVote',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        comments: [{
          ...initialState.comments[0],
          upVotesBy: [action.payload.userId],
        },],
      },
    );

    // action: neutralize vote thread
    const nextState2 = threadDetailReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the comments with the toggled down vote comment when given by TOGGLE_DOWN_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
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
    const action = {
      type: 'comments/toggleDownVote',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        comments: [{
          ...initialState.comments[0],
          downVotesBy: [action.payload.userId],
        },],
      },
    );

    // action: neutralize vote thread
    const nextState2 = threadDetailReducer(nextState, action);
    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the up voted comment with the toggled neutral vote comment when given by TOGGLE_NEUTRALIZE_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
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
      'upVotesBy': ['user-1'],
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
          'upVotesBy': ['user-1'],
          'downVotesBy': []
        }
      ]
    };
    const action = {
      type: 'comments/toggleNeutralVote',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        comments: [{
          ...initialState.comments[0],
          upVotesBy: [],
        },],
      },
    );
  });

  it('should return the down voted comment with the toggled neutral vote comment when given by TOGGLE_NEUTRALIZE_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
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
          'downVotesBy': ['user-1']
        }
      ]
    };
    const action = {
      type: 'comments/toggleNeutralVote',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        comments: [{
          ...initialState.comments[0],
          downVotesBy: [],
        },],
      },
    );
  });

  it('should return the down voted comment with the toggled up voted comment when given by TOGGLE_UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
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
          'downVotesBy': ['user-1']
        }
      ]
    };
    const action = {
      type: 'comments/toggleUpVote',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        comments: [{
          ...initialState.comments[0],
          upVotesBy: [action.payload.userId],
          downVotesBy: [],
        },],
      },
    );
  });

  it('should return the up voted comment with the toggled down vote comment when given by TOGGLE_DOWN_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
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
          'upVotesBy': ['user-1'],
          'downVotesBy': []
        }
      ]
    };
    const action = {
      type: 'comments/toggleDownVote',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        comments: [{
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [action.payload.userId],
        },],
      },
    );
  });

  it('should return the previous state when given by RESTORE_COMMENT_STATE action', () => {
    // arrange
    const initialState = {
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
          'downVotesBy': ['user-1']
        }
      ]
    };
    const previousComment = initialState.comments.find((comment) => comment.id === 'comment-1');

    const toggleAction = {
      type: 'comments/toggleUpVote',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };
    // action: up vote thread
    const nextState = threadDetailReducer(initialState, toggleAction);
    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        comments: [{
          ...initialState.comments[0],
          upVotesBy: [toggleAction.payload.userId],
          downVotesBy: [],
        },],
      },
    );

    const restoreAction = {
      type: 'comments/restoreState',
      payload: {
        comment: previousComment,
      },
    };

    // action: restore thread state
    const restoredState = threadDetailReducer(nextState, restoreAction);
    // assert
    expect(restoredState).toEqual(
      {
        ...initialState
      },
    );
  });
});