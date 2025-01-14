import React from 'react';
import ThreadButtons from '../Base/ThreadButtons';
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
    <div className="note">
      <div className="notes-item">
        <div className="note-title">
          <h3>
            <Link to={`/notes/${id}`}>{title}</Link>
          </h3>
        </div>
        <div className="note-date">
          <p>{showFormattedDate(createdAt)}</p>
        </div>
        <div className="note-des"></div>
        <p>{parser(body)}</p>
        <p>{upVotesBy.length}</p>
        <p>{totalComments}</p>
        <p>{category}</p>
        <p>{user.name}</p>
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
