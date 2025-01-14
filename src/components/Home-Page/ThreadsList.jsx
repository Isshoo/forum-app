import React from 'react';
import ThreadItem, { threadItemShape } from './ThreadItem';
import PropTypes from 'prop-types';

function ThreadsList({ threads }) {
  return (
    <>
      <div className="threads-list">
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
