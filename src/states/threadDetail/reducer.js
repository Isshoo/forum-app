import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;

  case ActionType.CLEAR_THREAD_DETAIL:
    return null;

  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.concat(action.payload.comment),
    };

  case ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
        ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
        : threadDetail.upVotesBy.concat([action.payload.userId]),
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
    };

  case ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
        ? threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
        : threadDetail.downVotesBy.concat([action.payload.userId]),
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
    };

  case ActionType.TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
    };

  case ActionType.TOGGLE_UP_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
              : comment.upVotesBy.concat([action.payload.userId]),
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      }),
    };

  case ActionType.TOGGLE_DOWN_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
              : comment.downVotesBy.concat([action.payload.userId]),
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),

          };
        }
        return comment;
      }),
    };

  case ActionType.TOGGLE_NEUTRAL_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      }),
    };

  case ActionType.RESTORE_COMMENT_STATE:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) =>
        comment.id === action.payload.comment.id ? action.payload.comment : comment
      ),
    };

  default:
    return threadDetail;
  }
}

export default threadDetailReducer;