import React from 'react';
import LeaderboardItem from './LeadearboardItem';
import PropTypes from 'prop-types';
import List from '../styled/List';

function LeaderboardList({ leaderboards, authUser }) {
  return (
    <List paddinginline="0.75rem" paddingblock="1.1rem 3rem" className="leaderboards-list">
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
    </List>
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
