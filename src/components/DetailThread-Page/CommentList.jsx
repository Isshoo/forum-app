import React from 'react';
import CommentItem from './CommentItem';
import PropTypes from 'prop-types';
import List from '../styled/List';

function CommentList({
  comments,
  authUser,
  onUpVoteComment,
  onDownVoteComment,
  onNeutralizeVoteComment,
}) {
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    <List gap="1rem" paddingblock="1rem">
      {sortedComments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          authUser={authUser}
          onUpVoteComment={onUpVoteComment}
          onDownVoteComment={onDownVoteComment}
          onNeutralizeVoteComment={onNeutralizeVoteComment}
        />
      ))}
    </List>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUser: PropTypes.string.isRequired,
  onUpVoteComment: PropTypes.func.isRequired,
  onDownVoteComment: PropTypes.func.isRequired,
  onNeutralizeVoteComment: PropTypes.func.isRequired,
};

export default CommentList;
