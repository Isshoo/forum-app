import React from 'react';
import { showFormattedDate } from '../../utils';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';

function ThreadsDetail({ title, body, createdAt }) {
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
          <div>{parser(body)}</div>
        </div>
      </div>
    </div>
  );
}

ThreadsDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default ThreadsDetail;
