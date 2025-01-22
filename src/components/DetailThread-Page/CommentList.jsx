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
  locale,
}) {
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    <List gutter="1rem" paddingBlock="1rem">
      {sortedComments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          authUser={authUser}
          onUpVoteComment={onUpVoteComment}
          onDownVoteComment={onDownVoteComment}
          onNeutralizeVoteComment={onNeutralizeVoteComment}
          locale={locale}
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
  locale: PropTypes.string.isRequired,
};

export default CommentList;
