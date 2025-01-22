import PropTypes from 'prop-types';
import React from 'react';
import parser from 'html-react-parser';
import { showFormattedDate } from '../../utils';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import Avatar from '../styled/Avatar';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  onUpVoteComment,
  onDownVoteComment,
  onNeutralizeVoteComment,
  locale,
}) {
  const isUpVotedByUser = upVotesBy.includes(authUser);
  const isDownVotedByUser = downVotesBy.includes(authUser);

  const onUpVoteCommentClick = (e) => {
    e.stopPropagation();
    onUpVoteComment(id);
  };
  const onDownVoteCommentClick = (e) => {
    e.stopPropagation();
    onDownVoteComment(id);
  };
  const onNeutralizeVoteCommentClick = (e) => {
    e.stopPropagation();
    onNeutralizeVoteComment(id);
  };

  return (
    <div className="comment-item">
      <div className="comment-avatar">
        <picture>
          <Avatar
            width="2rem"
            height="2rem"
            src={owner.avatar}
            alt=""
            className="comment-image"
            boxShadow="0px 0px 0px 0px transparent"
          />
        </picture>
      </div>
      <div className="comment-body">
        <div className="comment-header">
          <p className="comment-name">{owner.name}</p>
          <p className="comment-date">{showFormattedDate(createdAt, locale)}</p>
        </div>
        <div className="comment-content">{parser(content)}</div>
        <div className="comment-footer">
          <div className="comment-action">
            {isUpVotedByUser ? (
              <button onClick={onNeutralizeVoteCommentClick}>
                <BiSolidLike />
              </button>
            ) : (
              <button onClick={onUpVoteCommentClick}>
                <BiLike />
              </button>
            )}
            <p>{upVotesBy.length}</p>
          </div>
          <div className="comment-action red">
            {isDownVotedByUser ? (
              <button onClick={onNeutralizeVoteCommentClick}>
                <BiSolidDislike />
              </button>
            ) : (
              <button onClick={onDownVoteCommentClick}>
                <BiDislike />
              </button>
            )}
            <p>{downVotesBy.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  authUser: PropTypes.string.isRequired,
  onUpVoteComment: PropTypes.func.isRequired,
  onDownVoteComment: PropTypes.func.isRequired,
  onNeutralizeVoteComment: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default CommentItem;
