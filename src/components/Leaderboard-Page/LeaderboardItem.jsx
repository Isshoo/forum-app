import PropTypes from 'prop-types';
import React from 'react';
import Avatar from '../styled/Avatar';

function LeaderboardItem({ id, avatar, name, email, score, authUser }) {
  const isCurrentUser = authUser === id;
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-user">
        <div className="leaderboard-avatar">
          <Avatar
            width="3.25rem"
            height="3.25rem"
            src={avatar}
            alt=""
            className="leaderboard-image"
          />
        </div>
        <div className="leaderboard-info">
          <p className={isCurrentUser ? 'leaderboard-name isUser' : 'leaderboard-name'}>{name}</p>
          <p className="leaderboard-email">{email}</p>
        </div>
      </div>
      <div className="leaderboard-score">
        <p>{score}</p>
        <span>Pts</span>
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  /** The id of the leaderboard item */
  id: PropTypes.string.isRequired,
  /** The avatar of the leaderboard item */
  avatar: PropTypes.string.isRequired,
  /** The name of the leaderboard item */
  name: PropTypes.string.isRequired,
  /** The email of the leaderboard item */
  email: PropTypes.string.isRequired,
  /** The score of the leaderboard item */
  score: PropTypes.number.isRequired,
  /** The id of the current user */
  authUser: PropTypes.string.isRequired,
};

export default LeaderboardItem;
