import React, { useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import ThreadsList from '../components/Home-Page/ThreadsList';
import SearchThreadForm from '../components/Home-Page/SearchThreadForm';
import AddPageLink from '../components/Home-Page/AddThreadBtn';
import CategoryDropdown from '../components/Home-Page/CategoryDropdown';
import useSearch from '../hooks/useSearch';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import Loading from '../components/Base/LoadingBar';
import {
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
  asyncUpVoteThread,
} from '../states/threads/thunk';
import LocaleContext from '../contexts/LocaleContext';

function HomePage() {
  const firstRun = useRef(true);
  const dispatch = useDispatch();
  const { threads, users, authUser } = useSelector(
    (states) => ({
      threads: states.threads,
      users: states.users,
      authUser: states.authUser,
    }),
    shallowEqual
  );

  const [keyword, onKeywordChangeHandler] = useSearch();
  const [category, setCategory] = useState('');
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncPopulateUsersAndThreads());
      firstRun.current = false;
    }
  }, [dispatch]);

  const onUpVote = useCallback((id) => dispatch(asyncUpVoteThread(id)), [dispatch]);
  const onDownVote = useCallback((id) => dispatch(asyncDownVoteThread(id)), [dispatch]);
  const onNeutralizeVote = useCallback((id) => dispatch(asyncNeutralizeVoteThread(id)), [dispatch]);

  const categories = useMemo(() => {
    return threads && threads.length ? [...new Set(threads.map((thread) => thread.category))] : [];
  }, [threads]);

  const filteredThreads = useMemo(() => {
    return threads
      .filter((thread) => {
        const matchesCategory = category === '' || thread.category === category;
        const matchesKeyword = thread.title.toLowerCase().includes(keyword.toLowerCase());
        return matchesCategory && matchesKeyword;
      })
      .map((thread) => ({
        ...thread,
        user: users.find((user) => user.id === thread.ownerId),
        authUser: authUser.id,
        onUpVote,
        onDownVote,
        onNeutralizeVote,
      }));
  }, [threads, category, keyword, users, authUser, onUpVote, onDownVote, onNeutralizeVote]);

  if (!threads.length || !users.length || !authUser.id) {
    return <Loading />;
  }

  return (
    <section className="pages-section">
      <div className="filter-container">
        <CategoryDropdown categories={categories} setCategory={setCategory} />
        <SearchThreadForm
          keyword={keyword}
          keywordChange={onKeywordChangeHandler}
          locale={locale}
        />
      </div>
      <ThreadsList threads={filteredThreads} allUsers={users} />
      <AddPageLink />
    </section>
  );
}

export default HomePage;
