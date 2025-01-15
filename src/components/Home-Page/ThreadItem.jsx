import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../../utils';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import LocaleContext from '../../contexts/LocaleContext';

function ThreadItem({
  id,
  title,
  body,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  category,
  user,
  authUser,
}) {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="thread">
      <Link className="threads-item" to={`/threads/${id}`}>
        <div className="thread-header">
          <div className="thread-avatar">
            <img src={user.avatar} alt="" />
          </div>
          <div className="thread-user">
            <p className="thread-name">{user.name}</p>
            <p className="thread-email">{user.email}</p>
            <p className="thread-date">{showFormattedDate(createdAt, locale)}</p>
          </div>
        </div>
        <div className="thread-body">
          <h3 className="thread-title">{title}</h3>
          <div className="thread-des">{parser(body)}</div>
          <div className="thread-category">
            <p>{category !== 'general' ? `#${category}` : ''}</p>
          </div>
        </div>
        <div className="thread-footer">
          <p>{upVotesBy.length}</p>
          <p>{downVotesBy.length}</p>
          <p>{totalComments}</p>
        </div>
      </Link>
    </div>
  );
}

export const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
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
