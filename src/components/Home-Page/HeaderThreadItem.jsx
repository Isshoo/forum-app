import React, { useContext } from 'react';
import { showFormattedDate } from '../../utils';
import LocaleContext from '../../contexts/LocaleContext';
import PropTypes from 'prop-types';

function HeaderThreadItem({ avatar, name, email, createdAt }) {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="thread-header">
      <div className="thread-avatar">
        <img src={avatar} alt="" />
      </div>
      <div className="thread-user">
        <p className="thread-name">{name}</p>
        <p className="thread-email">{email}</p>
        <p className="thread-date">
          {showFormattedDate(createdAt, locale)} <span></span>
        </p>
      </div>
    </div>
  );
}

HeaderThreadItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default HeaderThreadItem;
