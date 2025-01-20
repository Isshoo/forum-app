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
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  authUser: PropTypes.string.isRequired,
};

export default LeaderboardItem;
