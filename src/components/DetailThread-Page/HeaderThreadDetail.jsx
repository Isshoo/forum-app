import React, { useContext } from 'react';
import { showFormattedDate } from '../../utils';
import LocaleContext from '../../contexts/LocaleContext';
import PropTypes from 'prop-types';

function HeaderThreadDetail({ avatar, name, email, createdAt }) {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="thread-header-detail">
      <div className="thread-avatar-detail">
        <img src={avatar} alt="" />
      </div>
      <div className="thread-user-detail">
        <p className="thread-name-detail">{name}</p>
        <p className="thread-email-detail">{email}</p>
        <p className="thread-date-detail">
          {showFormattedDate(createdAt, locale)} <span></span>
        </p>
      </div>
    </div>
  );
}

HeaderThreadDetail.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default HeaderThreadDetail;
