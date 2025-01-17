import React, { useRef } from 'react';
import { useEffect } from 'react';
import AddPageLink from '../components/Home-Page/AddThreadBtn';
import { useDispatch, useSelector } from 'react-redux';
import { asyncRecieveLeaderboards } from '../states/leaderboards/action';
import Loading from '../components/Base/LoadingBar';
import LeaderboardList from '../components/Leaderboard-Page/LeaderboardsList';

function LeaderboardPage() {
  const firstRun = useRef(true);
  const leaderboards = useSelector((states) => states.leaderboards || []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncRecieveLeaderboards());
      firstRun.current = false;
    }
  }, [dispatch]);

  if (!leaderboards.length) {
    return <Loading />;
  }

  return (
    <section className="pages-section">
      <h3 className="leaderboard-title">Top Active Users</h3>
      <LeaderboardList leaderboards={leaderboards} />
      <AddPageLink />
    </section>
  );
}

export default LeaderboardPage;
