import React from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import { FaRegComments } from 'react-icons/fa';
import PropTypes from 'prop-types';

function CommentSection({
  comments,
  authUser,
  onAddComment,
  onUpVoteComment,
  onDownVoteComment,
  onNeutralizeVoteComment,
  locale,
}) {
  return (
    <div className="comment-section">
      <div className="comment-head">
        <h3>{locale === 'EN' ? 'Comments' : 'Komentar'}</h3>
        <div className="comments-total">
          <FaRegComments />
          <p>{comments.length}</p>
        </div>
      </div>
      <CommentInput onAddComment={onAddComment} locale={locale} />
      <CommentList
        comments={comments}
        authUser={authUser}
        onUpVoteComment={onUpVoteComment}
        onDownVoteComment={onDownVoteComment}
        onNeutralizeVoteComment={onNeutralizeVoteComment}
        locale={locale}
      />
    </div>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUser: PropTypes.string.isRequired,
  onAddComment: PropTypes.func.isRequired,
  onUpVoteComment: PropTypes.func.isRequired,
  onDownVoteComment: PropTypes.func.isRequired,
  onNeutralizeVoteComment: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default CommentSection;
