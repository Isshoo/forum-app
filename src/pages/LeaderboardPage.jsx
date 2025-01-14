import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import ThreadsList from '../components/Home-Page/ThreadsList';
import SearchThreadForm from '../components/Home-Page/SearchThreadForm';
import AddPageLink from '../components/Home-Page/AddThreadBtn';
import useSearch from '../hooks/useSearch';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';

function ArchivedNotesPage() {
  const firstRun = useRef(true);
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();

  const [keyword, onKeywordChangeHandler] = useSearch();

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncPopulateUsersAndThreads());
      firstRun.current = false;
    }
  }, [dispatch]);

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <section className="pages-section">
      <SearchThreadForm keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <br />
      <ThreadsList threads={threadsList} />
      <AddPageLink />
    </section>
  );
}

export default ArchivedNotesPage;
