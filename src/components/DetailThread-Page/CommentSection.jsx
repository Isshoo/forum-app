import React, { useContext } from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import { FaRegComments, FaComments } from 'react-icons/fa';
import PropTypes from 'prop-types';
import LocaleContext from '../../contexts/LocaleContext';

function CommentSection({
  comments,
  authUser,
  onAddComment,
  onUpVoteComment,
  onDownVoteComment,
  onNeutralizeVoteComment,
}) {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="comment-section">
      <div className="comment-head">
        <h3>{locale === 'EN' ? 'Comments' : 'Komentar'}</h3>
        <div className="comments-total">
          <FaRegComments />
          <p>{comments.length}</p>
        </div>
      </div>
      <CommentInput onAddComment={onAddComment} />
      <CommentList
        comments={comments}
        authUser={authUser}
        onUpVoteComment={onUpVoteComment}
        onDownVoteComment={onDownVoteComment}
        onNeutralizeVoteComment={onNeutralizeVoteComment}
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
};

export default CommentSection;
