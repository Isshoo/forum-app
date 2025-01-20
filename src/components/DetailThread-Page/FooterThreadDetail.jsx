import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import LocaleContext from '../../contexts/LocaleContext';
import UpVotesInfoDetail from './UpVotesInfoDetail';
import DownVotesInfoDetail from './DownVotesInfoDetail';

function FooterThreadDetail({
  upVotesBy,
  downVotesBy,
  authUser,
  allUsers,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
}) {
  const { locale } = useContext(LocaleContext);

  const isUpVotedByUser = upVotesBy.includes(authUser);
  const isDownVotedByUser = downVotesBy.includes(authUser);

  return (
    <div className="thread-footer-detail">
      <div className="thread-numbers-container-detail">
        <div className="thread-votes-number-detail">
          <div className="thread-number-detail">
            <UpVotesInfoDetail upVotesBy={upVotesBy} allUsers={allUsers} locale={locale} />
          </div>
          <span></span>
          <div className="thread-number-detail">
            <DownVotesInfoDetail downVotesBy={downVotesBy} allUsers={allUsers} locale={locale} />
          </div>
        </div>
      </div>
      <div className="thread-actions-container-detail">
        {isUpVotedByUser ? (
          <button className="thread-action-detail active" onClick={() => onNeutralizeVote()}>
            <BiSolidLike />
            <p>{locale === 'ID' ? 'Suka' : 'Up Vote'}</p>
          </button>
        ) : (
          <button className="thread-action-detail" onClick={() => onUpVote()}>
            <BiLike />
            <p>{locale === 'ID' ? 'Suka' : 'Up Vote'}</p>
          </button>
        )}
        {isDownVotedByUser ? (
          <button className="thread-action-detail active red" onClick={() => onNeutralizeVote()}>
            <BiSolidDislike />
            <p>{locale === 'ID' ? 'Tidak suka' : 'Down Vote'}</p>
          </button>
        ) : (
          <button className="thread-action-detail red" onClick={() => onDownVote()}>
            <BiDislike />
            <p>{locale === 'ID' ? 'Tidak suka' : 'Down Vote'}</p>
          </button>
        )}
      </div>
    </div>
  );
}

FooterThreadDetail.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ),
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

export default FooterThreadDetail;
