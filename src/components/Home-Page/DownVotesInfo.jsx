import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BiDislike, BiSolidDislike } from 'react-icons/bi';
import LocaleContext from '../../contexts/LocaleContext';

function DownVotesInfo({ downVotesBy, allUsers }) {
  const { locale } = useContext(LocaleContext);
  const voterName = allUsers.find((user) => user.id === downVotesBy[0])?.name || '';
  const lastVoter =
    allUsers.find((user) => user.id === downVotesBy[downVotesBy.length - 1])?.name || '';

  if (downVotesBy.length === 0) {
    return (
      <>
        <BiDislike />
        <p>{downVotesBy.length}</p>
      </>
    );
  }
  if (downVotesBy.length === 1) {
    return (
      <>
        <BiSolidDislike />
        <p>{voterName}</p>
      </>
    );
  }
  return (
    <>
      <BiSolidDislike />
      <p>
        {lastVoter}{' '}
        {locale === 'ID'
          ? `dan ${downVotesBy.length - 1} lainnya`
          : `and ${downVotesBy.length - 1} others`}
      </p>
    </>
  );
}

DownVotesInfo.propTypes = {
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DownVotesInfo;
