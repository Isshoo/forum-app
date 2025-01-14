import React from 'react';
import { showFormattedDate } from '../../utils';
import ThreadButtons from '../Base/ThreadButtons';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';

function ThreadsDetail({ id, archived, title, body, createdAt, onDelete, onArchive }) {
  return (
    <div className="thread detail">
      <div className="threads-item detail">
        <div className="thread-title detail">
          <h3>{title}</h3>
        </div>
        <div className="thread-date detail">
          <p>{showFormattedDate(createdAt)}</p>
        </div>
        <div className="thread-des detail">
          <p>{parser(body)}</p>
        </div>
        <ThreadButtons id={id} archived={archived} onDelete={onDelete} onArchive={onArchive} />
      </div>
    </div>
  );
}

ThreadsDetail.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ThreadsDetail;
