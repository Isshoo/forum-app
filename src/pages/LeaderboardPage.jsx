import React, { useContext, useRef } from 'react';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { asyncRecieveLeaderboards } from '../states/leaderboards/action';
import Loading from '../components/Base/LoadingBar';
import LeaderboardList from '../components/Leaderboard-Page/LeaderboardsList';
import LocaleContext from '../contexts/LocaleContext';
import Pages from '../components/styled/Pages';

function LeaderboardPage() {
  const firstRun = useRef(true);
  const { locale } = useContext(LocaleContext);

  const { leaderboards, authUser } = useSelector(
    (states) => ({
      leaderboards: states.leaderboards,
      authUser: states.authUser,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncRecieveLeaderboards());
      firstRun.current = false;
    }
  }, [dispatch]);

  if (!leaderboards.length || !authUser.id) {
    return <Loading />;
  }

  return (
    <Pages>
      <h3 className="leaderboard-title">
        {locale === 'EN' ? 'Top Active Users' : 'Klasemen Pengguna Aktif'}
      </h3>
      <LeaderboardList leaderboards={leaderboards} authUser={authUser.id} />
    </Pages>
  );
}

export default LeaderboardPage;
