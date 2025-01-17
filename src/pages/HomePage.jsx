import React, { useState, useEffect, useRef } from 'react';
import ThreadsList from '../components/Home-Page/ThreadsList';
import SearchThreadForm from '../components/Home-Page/SearchThreadForm';
import AddPageLink from '../components/Home-Page/AddThreadBtn';
import CategoryDropdown from '../components/Home-Page/CategoryDropdown';
import useSearch from '../hooks/useSearch';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import Loading from '../components/Base/LoadingBar';
import {
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
  asyncUpVoteThread,
} from '../states/threads/thunk';

function HomePage() {
  const firstRun = useRef(true);
  const dispatch = useDispatch();
  const {
    threads = [],
    users = [],
    authUser = {},
  } = useSelector((state) => ({
    threads: state.threads,
    users: state.users,
    authUser: state.authUser,
  }));

  const [keyword, onKeywordChangeHandler] = useSearch();
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncPopulateUsersAndThreads());
      firstRun.current = false;
    }
  }, [dispatch]);

  const onUpVote = (id) => {
    dispatch(asyncUpVoteThread(id));
  };

  const onDownVote = (id) => {
    dispatch(asyncDownVoteThread(id));
  };

  const onNeutralizeVote = (id) => {
    dispatch(asyncNeutralizeVoteThread(id));
  };

  const categories = [...new Set(threads.map((thread) => thread.category))];

  const filteredThreads = threads
    .filter((thread) => {
      const matchesCategory = category === '' || thread.category === category;
      const matchesKeyword = thread.title.toLowerCase().includes(keyword.toLowerCase());
      return matchesCategory && matchesKeyword;
    })
    .map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId),
      authUser: authUser.id,
    }));

  if (!threads.length || !users.length || !authUser.id) {
    return <Loading />;
  }

  return (
    <section className="pages-section">
      <div className="filter-container">
        <CategoryDropdown categories={categories} setCategory={setCategory} />
        <SearchThreadForm keyword={keyword} keywordChange={onKeywordChangeHandler} />
      </div>
      <ThreadsList
        threads={filteredThreads}
        allUsers={users}
        onUpVote={onUpVote || (() => {})} // Pastikan ada fallback jika undefined
        onDownVote={onDownVote || (() => {})} // Pastikan ada fallback jika undefined
        onNeutralizeVote={onNeutralizeVote || (() => {})}
      />
      <AddPageLink />
    </section>
  );
}

export default HomePage;
