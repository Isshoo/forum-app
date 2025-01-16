import React from 'react';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';

function BodyThreadDetail({ title, body, category }) {
  return (
    <div className="thread-body-detail">
      <h3 className="thread-title-detail">{title}</h3>
      <div className="thread-des-detail">{parser(body)}</div>
      <div className="thread-category-detail">
        <p>{category !== 'general' ? `#${category}` : ''}</p>
      </div>
    </div>
  );
}

BodyThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default BodyThreadDetail;
