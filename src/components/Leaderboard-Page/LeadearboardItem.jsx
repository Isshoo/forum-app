import PropTypes from 'prop-types';
import React from 'react';

function LeaderboardItem({ avatar, name, email, score }) {
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-user">
        <div className="leaderboard-avatar">
          <img src={avatar} alt="" />
        </div>
        <div className="leaderboard-info">
          <p className="leaderboard-name">{name}</p>
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
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
