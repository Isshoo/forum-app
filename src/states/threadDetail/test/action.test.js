/**
 * skenario test
 *
 * - asyncAddComment thunk
 *  - should dispatch addCommentActionCreator when adding comment succeeds
 *  - should return error when adding comment fails
 *
 * - asyncUpVoteThreadDetail thunk
 *  - should dispatch toggleUpVoteThreadDetailActionCreator and call API when upvoting thread succeeds
 *  - should restore previous state and call alert when upvoting thread detail fails
 *
 * - asyncDownVoteThreadDetail thunk
 *  - should dispatch toggleDownVoteThreadDetailActionCreator and call API when downvoting thread succeeds
 *  - should restore previous state and call alert when downvoting thread detail fails
 *
 * - asyncNeutralizeVoteThreadDetail thunk
 *  - should dispatch toggleNeutralizeVoteThreadDetailActionCreator and call API when neutralizing vote succeeds
 *  - should restore previous state and call alert when neutralizing vote detail fails
 *
 * - asyncUpVoteComment thunk
 *  - should dispatch toggleUpVoteCommentActionCreator and call API when upvoting Comment succeeds
 *  - should restore previous state comment and call alert when upvoting comment fails
 *
 * - asyncDownVoteComment thunk
 *  - should dispatch toggleDownVoteCommentActionCreator and call API when downvoting comment succeeds
 *  - should restore previous state comment and call alert when downvoting comment fails
 *
 * - asyncNeutralizeVoteComment thunk
 *  - should dispatch toggleNeutralizeVoteCommentActionCreator and call API when neutralizing vote succeeds
 *  - should restore previous state comment and call alert when neutralizing vote comment fails
 *
 */

import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import api from '../../../utils/api-test';
import { asyncAddComment, asyncDownVoteComment, asyncDownVoteThreadDetail, asyncNeutralizeVoteComment, asyncNeutralizeVoteThreadDetail, asyncUpVoteComment, asyncUpVoteThreadDetail } from '../thunk';
import { addCommentActionCreator, receiveThreadDetailActionCreator, restoreCommentStateActionCreator, toggleDownVoteCommentActionCreator, toggleDownVoteThreadDetailActionCreator, toggleNeutralizeVoteCommentActionCreator, toggleNeutralizeVoteThreadDetailActionCreator, toggleUpVoteCommentActionCreator, toggleUpVoteThreadDetailActionCreator } from '../action';

const fakeNewComment = {
  'content': 'Ini adalah komentar pertama',
};
const fakeNewCommentResponse = {
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
};
const authUser = {
  'id': 'user-1',
  'name': 'John Doe',
  'email': 'john@example.com',
  'avatar': 'https://generated-image-url.jpg'
};

const threadDetail =
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

const commentId = 'comment-1';
const fakeUpVoteComment = {
  'id': 'vote-1',
  'userId': 'users-1',
  'commentId': 'comment-1',
  'voteType': 1
};
const fakeDownVoteComment = {
  'id': 'vote-1',
  'userId': 'users-1',
  'commentId': 'comment-1',
  'voteType': -1
};
const fakeNeutralizeVoteComment = {
  'id': 'vote-1',
  'userId': 'users-1',
  'commentId': 'comment-1',
  'voteType': 0
};

const previousState = { ...threadDetail };
const previousComment = threadDetail.comments.find((comment) => comment.id === commentId);
const fakeError = new Error('Ups, something went wrong');

const getState = () => ({ authUser, threadDetail });
const dispatch = vi.fn();


describe('asyncAddComment thunk', () => {
  beforeEach(() => {
    api._createComment = api.createComment;
  });
  afterEach(() => {
    api.createComment = api._createComment;

    // delete backup data
    delete api._createComment;
  });

  it('should dispatch addCommentActionCreator when adding comment succeeds', async () => {
    // Arrange
    api.createComment = () => Promise.resolve(fakeNewCommentResponse);
    // Act
    await asyncAddComment(fakeNewComment)(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeNewCommentResponse));
  });

  it('should return error when adding comment fails', async () => {
    // Arrange
    api.createComment = () => Promise.reject(fakeError);
    // Act
    const result = await asyncAddComment(fakeNewComment)(dispatch, getState);

    // Assert
    expect(result).toEqual({ success: false, message: fakeError.message });
  });
});

describe('asyncUpVoteThreadDetail thunk', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
  });
  afterEach(() => {
    api.upVoteThread = api._upVoteThread;

    // delete backup data
    delete api._upVoteThread;
  });

  it('should dispatch toggleUpVoteThreadDetailActionCreator and call API when upvoting thread succeeds', async () => {
    // Arrange
    api.upVoteThread = () => Promise.resolve(fakeUpVote);

    // Act
    await asyncUpVoteThreadDetail()(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThreadDetailActionCreator(authUser.id));
  });

  it('should restore previous state and call alert when upvoting thread detail fails', async () => {
    // Arrange
    api.upVoteThread = () => Promise.reject(fakeError);
    window.alert = vi.fn();

    // Act
    await asyncUpVoteThreadDetail()(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThreadDetailActionCreator(authUser.id));
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(previousState));
  });
});

describe('asyncDownVoteThreadDetail thunk', () => {
  beforeEach(() => {
    api._downVoteThread = api.downVoteThread;
  });
  afterEach(() => {
    api.downVoteThread = api._downVoteThread;

    // delete backup data
    delete api._downVoteThread;
  });

  it('should dispatch toggleDownVoteThreadDetailActionCreator and call API when downvoting thread succeeds', async () => {

    api.downVoteThread = () => Promise.resolve(fakeDownVote);

    await asyncDownVoteThreadDetail()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThreadDetailActionCreator(authUser.id));
  });

  it('should restore previous state and call alert when downvoting thread detail fails', async () => {

    api.downVoteThread = () => Promise.reject(fakeError);
    window.alert = vi.fn();

    await asyncDownVoteThreadDetail()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThreadDetailActionCreator(authUser.id));
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(previousState));
  });
});

describe('asyncNeutralizeVoteThreadDetail thunk', () => {
  beforeEach(() => {
    api._neutralizeVoteThread = api.neutralizeVoteThread;
  });
  afterEach(() => {
    api.neutralizeVoteThread = api._neutralizeVoteThread;

    // delete backup data
    delete api._neutralizeVoteThread;
  });

  it('should dispatch toggleNeutralizeVoteThreadDetailActionCreator and call API when neutralizing vote succeeds', async () => {
    // Arrange
    api.neutralizeVoteThread = () => Promise.resolve(fakeNeutralizeVote);

    // Act
    await asyncNeutralizeVoteThreadDetail()(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteThreadDetailActionCreator(authUser.id));
  });

  it('should restore previous state and call alert when neutralizing vote detail fails', async () => {
    // Arrange
    api.neutralizeVoteThread = () => Promise.reject(fakeError);
    window.alert = vi.fn();

    // Act
    await asyncNeutralizeVoteThreadDetail()(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteThreadDetailActionCreator(authUser.id));
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(previousState));
  });
});

describe('asyncUpVoteComment thunk', () => {
  beforeEach(() => {
    api._upVoteComment = api.upVoteComment;
  });
  afterEach(() => {
    api.upVoteComment = api._upVoteComment;

    // delete backup data
    delete api._upVoteComment;
  });

  it('should dispatch toggleUpVoteCommentActionCreator and call API when upvoting Comment succeeds', async () => {
    // Arrange
    api.upVoteComment = () => Promise.resolve(fakeUpVoteComment);

    // Act
    await asyncUpVoteComment(commentId)(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
  });

  it('should restore previous state comment and call alert when upvoting comment fails', async () => {
    // Arrange
    api.upVoteComment = () => Promise.reject(fakeError);
    window.alert = vi.fn();

    // Act
    await asyncUpVoteComment(commentId)(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(restoreCommentStateActionCreator(previousComment));
  });
});

describe('asyncDownVoteComment thunk', () => {
  beforeEach(() => {
    api._downVoteComment = api.downVoteComment;
  });
  afterEach(() => {
    api.downVoteComment = api._downVoteComment;

    // delete backup data
    delete api._downVoteComment;
  });

  it('should dispatch toggleDownVoteCommentActionCreator and call API when downvoting comment succeeds', async () => {

    api.downVoteComment = () => Promise.resolve(fakeDownVoteComment);

    await asyncDownVoteComment(commentId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
  });

  it('should restore previous state comment and call alert when downvoting comment fails', async () => {

    api.downVoteComment = () => Promise.reject(fakeError);
    window.alert = vi.fn();

    await asyncDownVoteComment(commentId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(restoreCommentStateActionCreator(previousComment));
  });
});

describe('asyncNeutralizeVoteComment thunk', () => {
  beforeEach(() => {
    api._neutralizeVoteComment = api.neutralizeVoteComment;
  });
  afterEach(() => {
    api.neutralizeVoteComment = api._neutralizeVoteComment;

    // delete backup data
    delete api._neutralizeVoteComment;
  });

  it('should dispatch toggleNeutralizeVoteCommentActionCreator and call API when neutralizing vote succeeds', async () => {
    // Arrange
    api.neutralizeVoteComment = () => Promise.resolve(fakeNeutralizeVoteComment);

    // Act
    await asyncNeutralizeVoteComment(commentId)(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
  });

  it('should restore previous state comment and call alert when neutralizing vote comment fails', async () => {
    // Arrange
    api.neutralizeVoteComment = () => Promise.reject(fakeError);
    window.alert = vi.fn();

    // Act
    await asyncNeutralizeVoteComment(commentId)(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(restoreCommentStateActionCreator(previousComment));
  });
});
