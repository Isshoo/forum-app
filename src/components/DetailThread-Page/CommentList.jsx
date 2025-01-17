import React from 'react';
import CommentItem from './CommentItem';
import PropTypes from 'prop-types';

function CommentList({ comments, authUser }) {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} authUser={authUser} />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUser: PropTypes.string.isRequired,
};

export default CommentList;
