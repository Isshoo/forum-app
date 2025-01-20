import React, { useContext } from 'react';
import { showFormattedDate } from '../../utils';
import LocaleContext from '../../contexts/LocaleContext';
import PropTypes from 'prop-types';
import Avatar from '../styled/Avatar';

function HeaderThreadDetail({ avatar, name, email, createdAt }) {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="thread-header-detail">
      <div className="thread-avatar-detail">
        <Avatar width="4rem" height="4rem" src={avatar} alt="" className="detail-image" />
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
