import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { FaRegComments, FaComments } from 'react-icons/fa';
import UpVotesInfo from './UpVotesInfo';
import DownVotesInfo from './DownVotesInfo';

function FooterThreadItem({
  id,
  upVotesBy,
  downVotesBy,
  totalComments,
  authUser,
  allUsers,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
  locale,
}) {
  const isUpVotedByUser = upVotesBy.includes(authUser);
  const isDownVotedByUser = downVotesBy.includes(authUser);

  const onUpVoteClick = (e) => {
    e.stopPropagation();
    onUpVote(id);
  };
  const onDownVoteClick = (e) => {
    e.stopPropagation();
    onDownVote(id);
  };
  const onNeutralizeVoteClick = (e) => {
    e.stopPropagation();
    onNeutralizeVote(id);
  };

  return (
    <div className="thread-footer">
      <div className="thread-numbers-container">
        <div className="thread-votes-number">
          <div className="thread-number">
            <UpVotesInfo upVotesBy={upVotesBy} allUsers={allUsers} locale={locale} />
          </div>
          <span></span>
          <div className="thread-number">
            <DownVotesInfo downVotesBy={downVotesBy} allUsers={allUsers} locale={locale} />
          </div>
        </div>
        <div className="thread-number">
          <p>{totalComments}</p>
          <p>{locale === 'ID' ? 'Komentar' : 'Comments'}</p>
        </div>
      </div>
      <div className="thread-actions-container">
        {isUpVotedByUser ? (
          <button className="thread-action active" onClick={onNeutralizeVoteClick}>
            <BiSolidLike />
            <p>{locale === 'ID' ? 'Suka' : 'Up Vote'}</p>
          </button>
        ) : (
          <button className="thread-action" onClick={onUpVoteClick}>
            <BiLike />
            <p>{locale === 'ID' ? 'Suka' : 'Up Vote'}</p>
          </button>
        )}
        {isDownVotedByUser ? (
          <button className="thread-action active red" onClick={onNeutralizeVoteClick}>
            <BiSolidDislike />
            <p>{locale === 'ID' ? 'Tidak suka' : 'Down Vote'}</p>
          </button>
        ) : (
          <button className="thread-action red" onClick={onDownVoteClick}>
            <BiDislike />
            <p>{locale === 'ID' ? 'Tidak suka' : 'Down Vote'}</p>
          </button>
        )}
        <Link className="thread-action comment" to={`/threads/${id}`}>
          <FaComments className="solid" />
          <FaRegComments className="no-solid" />
          <p>{locale === 'ID' ? 'Komentar' : 'Comment'}</p>
        </Link>
      </div>
    </div>
  );
}

FooterThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  authUser: PropTypes.string.isRequired,
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default FooterThreadItem;
