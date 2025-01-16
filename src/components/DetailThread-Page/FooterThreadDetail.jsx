import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import LocaleContext from '../../contexts/LocaleContext';
import UpVotesInfoDetail from './UpVotesInfoDetail';
import DownVotesInfoDetail from './DownVotesInfoDetail';

function FooterThreadDetail({ upVotesBy, downVotesBy, authUser, allUsers }) {
  const { locale } = useContext(LocaleContext);

  const isUpVotedByUser = upVotesBy.includes(authUser);
  const isDownVotedByUser = downVotesBy.includes(authUser);

  return (
    <div className="thread-footer-detail">
      <div className="thread-numbers-container-detail">
        <div className="thread-votes-number-detail">
          <div className="thread-number-detail">
            <UpVotesInfoDetail upVotesBy={upVotesBy} allUsers={allUsers} />
          </div>
          <span></span>
          <div className="thread-number-detail">
            <DownVotesInfoDetail downVotesBy={downVotesBy} allUsers={allUsers} />
          </div>
        </div>
      </div>
      <div className="thread-actions-container-detail">
        {isUpVotedByUser ? (
          <div className="thread-action-detail active">
            <BiSolidLike />
            <p>{locale === 'ID' ? 'Suka' : 'Up Vote'}</p>
          </div>
        ) : (
          <div className="thread-action-detail">
            <BiLike />
            <p>{locale === 'ID' ? 'Suka' : 'Up Vote'}</p>
          </div>
        )}
        {isDownVotedByUser ? (
          <div className="thread-action-detail active red">
            <BiSolidDislike />
            <p>{locale === 'ID' ? 'Tidak suka' : 'Down Vote'}</p>
          </div>
        ) : (
          <div className="thread-action-detail red">
            <BiDislike />
            <p>{locale === 'ID' ? 'Tidak suka' : 'Down Vote'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

FooterThreadDetail.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FooterThreadDetail;
