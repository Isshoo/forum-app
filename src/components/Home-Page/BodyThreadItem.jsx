import React from 'react';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';

function BodyThreadItem({ title, body, category }) {
  return (
    <>
      <h3 className="thread-title">{title}</h3>
      <div className="thread-des">{parser(body)}</div>
      <div className="thread-category">
        <p>{category !== 'general' ? `#${category}` : ''}</p>
      </div>
    </>
  );
}

BodyThreadItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default BodyThreadItem;
