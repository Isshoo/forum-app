import React from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../../utils';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';

function ThreadItem({
  id,
  title,
  body,
  createdAt,
  upVotesBy,
  totalComments,
  category,
  user,
  authUser,
}) {
  return (
    <div className="thread">
      <div className="threads-item">
        <div className="thread-title">
          <h3>
            <Link to={`/threads/${id}`}>{title}</Link>
          </h3>
        </div>
        <div className="thread-date">
          <p>{showFormattedDate(createdAt)}</p>
        </div>
        <div className="thread-des">
          <div>{parser(body)}</div>
          <p>{upVotesBy.length}</p>
          <p>{totalComments}</p>
          <p>{category}</p>
          <p>{user.name}</p>
        </div>
      </div>
    </div>
  );
}

export const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  authUser: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
};

export default ThreadItem;
