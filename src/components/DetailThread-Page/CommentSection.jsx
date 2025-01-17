import React from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import { FaRegComments, FaComments } from 'react-icons/fa';
import PropTypes from 'prop-types';

function CommentSection({ comments, authUser }) {
  return (
    <div className="comment-section">
      <div className="comment-head">
        <h3>Beri Komentar</h3>
        <div className="comments-total">
          <FaRegComments />
          <p>{comments.length}</p>
        </div>
      </div>
      <CommentInput />
      <CommentList comments={comments} authUser={authUser} />
    </div>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUser: PropTypes.string.isRequired,
};

export default CommentSection;
