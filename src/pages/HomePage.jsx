import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import ThreadsList from '../components/Home-Page/ThreadsList';
import SearchThreadForm from '../components/Home-Page/SearchThreadForm';
import AddPageLink from '../components/Home-Page/AddThreadBtn';
import CategoryDropdown from '../components/Home-Page/CategoryDropdown';
import useSearch from '../hooks/useSearch';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';

function HomePage() {
  const firstRun = useRef(true);
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();

  const [keyword, onKeywordChangeHandler] = useSearch();

  const [category, setCategory] = useState('');

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncPopulateUsersAndThreads());
      firstRun.current = false;
    }
  }, [dispatch]);

  const categories = [...new Set(threads.map((thread) => thread.category))];

  const filteredThreadsByCat =
    category === '' ? threads : threads.filter((thread) => thread.category === category);

  const filteredThreads = filteredThreadsByCat.filter((thread) =>
    thread.title.toLowerCase().includes(keyword.toLowerCase())
  );

  const threadsList = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <section className="pages-section">
      <div className="filter-container">
        <CategoryDropdown categories={categories} setCategory={setCategory} />
        <SearchThreadForm keyword={keyword} keywordChange={onKeywordChangeHandler} />
      </div>
      <ThreadsList threads={threadsList} allUsers={users} />
      <AddPageLink />
    </section>
  );
}

export default HomePage;
