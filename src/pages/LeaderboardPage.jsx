import React, { useRef } from 'react';
import { useEffect } from 'react';
import SearchThreadForm from '../components/Home-Page/SearchThreadForm';
import AddPageLink from '../components/Home-Page/AddThreadBtn';
import useSearch from '../hooks/useSearch';
import { useDispatch, useSelector } from 'react-redux';
import { asyncRecieveLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const firstRun = useRef(true);
  const leaderboards = useSelector((states) => states.leaderboards);

  const dispatch = useDispatch();

  const [keyword, onKeywordChangeHandler] = useSearch();

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncRecieveLeaderboards());
      firstRun.current = false;
    }
  }, [dispatch]);

  return (
    <section className="pages-section">
      <SearchThreadForm keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <br />
      <div>Halaman Leaderboard</div>
      <ul>
        {leaderboards.map((leaderboard) => (
          <li key={leaderboard.user.id}>
            {leaderboard.user.name} - {leaderboard.score}
          </li>
        ))}
      </ul>
      <AddPageLink />
    </section>
  );
}

export default LeaderboardPage;
