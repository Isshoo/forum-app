import React from 'react';
import LeaderboardItem from './LeadearboardItem';
import PropTypes from 'prop-types';

function LeaderboardList({ leaderboards, authUser }) {
  return (
    <div className="leaderboard-list">
      {leaderboards.map((leaderboard) => (
        <LeaderboardItem
          key={leaderboard.user.id}
          id={leaderboard.user.id}
          name={leaderboard.user.name}
          email={leaderboard.user.email}
          avatar={leaderboard.user.avatar}
          score={leaderboard.score}
          authUser={authUser}
        />
      ))}
    </div>
  );
}
LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
  authUser: PropTypes.string.isRequired,
};

export default LeaderboardList;
