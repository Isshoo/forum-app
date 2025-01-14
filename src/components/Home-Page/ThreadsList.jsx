import React from 'react';
import ThreadItem, { threadItemShape } from './ThreadItem';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../../contexts/LocaleContext';
import LoadingBar from '../Base/LoadingBar';

function ThreadsList({ threads }) {
  return (
    <>
      <div className="notes-list">
        {threads.map((thread) => (
          <ThreadItem key={thread.id} id={thread.id} {...thread} />
        ))}
      </div>
    </>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)),
};

export default ThreadsList;
