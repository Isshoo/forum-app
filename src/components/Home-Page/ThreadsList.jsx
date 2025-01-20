import React from 'react';
import ThreadItem, { threadItemShape } from './ThreadItem';
import PropTypes from 'prop-types';
import List from '../styled/List';

function ThreadsList({ threads, allUsers }) {
  return (
    <>
      <List>
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
      </List>
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
