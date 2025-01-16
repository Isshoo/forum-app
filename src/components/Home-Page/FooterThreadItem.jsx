import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { FaRegComments, FaComments } from 'react-icons/fa';
import LocaleContext from '../../contexts/LocaleContext';
import UpVotesInfo from './UpVotesInfo';

function FooterThreadItem({ upVotesBy, downVotesBy, totalComments, authUser, allUsers }) {
  const { locale } = useContext(LocaleContext);

  const isUpVotedByUser = upVotesBy.includes(authUser);
  const isDownVotedByUser = downVotesBy.includes(authUser);

  return (
    <div className="thread-footer">
      <div className="thread-numbers-container">
        <div className="thread-number">
          <UpVotesInfo upVotesBy={upVotesBy} allUsers={allUsers} />
        </div>
        <div className="thread-number">
          <p>{totalComments}</p>
          <p>{locale === 'ID' ? 'Komentar' : 'Comments'}</p>
        </div>
      </div>
      <div className="thread-actions-container">
        {isUpVotedByUser ? (
          <div className="thread-action active">
            <BiSolidLike />
            <p>{locale === 'ID' ? 'Suka' : 'Up Vote'}</p>
          </div>
        ) : (
          <div className="thread-action">
            <BiLike />
            <p>{locale === 'ID' ? 'Suka' : 'Up Vote'}</p>
          </div>
        )}
        {isDownVotedByUser ? (
          <div className="thread-action active red">
            <BiSolidDislike />
            <p>{locale === 'ID' ? 'Tidak suka' : 'Down Vote'}</p>
          </div>
        ) : (
          <div className="thread-action red">
            <BiDislike />
            <p>{locale === 'ID' ? 'Tidak suka' : 'Down Vote'}</p>
          </div>
        )}
        <div className="thread-action comment">
          <FaComments className="solid" />
          <FaRegComments className="no-solid" />
          <p>{locale === 'ID' ? 'Komentar' : 'Comment'}</p>
        </div>
      </div>
    </div>
  );
}

FooterThreadItem.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  authUser: PropTypes.string.isRequired,
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FooterThreadItem;
