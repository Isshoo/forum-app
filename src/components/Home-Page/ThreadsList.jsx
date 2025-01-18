import React from 'react';
import ThreadItem, { threadItemShape } from './ThreadItem';
import PropTypes from 'prop-types';

function ThreadsList({ threads, allUsers }) {
  return (
    <>
      <div className="threads-list">
        {threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            id={thread.id}
            {...thread}
            allUsers={allUsers}
            onUpVote={thread.onUpVote}
            onDownVote={thread.onDownVote}
            onNeutralizeVote={thread.onNeutralizeVote}
          />
        ))}
      </div>
    </>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ),
};

export default ThreadsList;
