import React from 'react';
import PropTypes from 'prop-types';
import { BiLike, BiSolidLike } from 'react-icons/bi';

function UpVotesInfo({ upVotesBy, allUsers, locale }) {
  const voterName = allUsers.find((user) => user.id === upVotesBy[0])?.name || '';
  const lastVoter =
    allUsers.find((user) => user.id === upVotesBy[upVotesBy.length - 1])?.name || '';

  if (upVotesBy.length === 0) {
    return (
      <>
        <BiLike />
        <p>{upVotesBy.length}</p>
      </>
    );
  }
  if (upVotesBy.length === 1) {
    return (
      <>
        <BiSolidLike />
        <p>{voterName}</p>
      </>
    );
  }
  return (
    <>
      <BiSolidLike />
      <p>
        {lastVoter}{' '}
        {locale === 'ID'
          ? `dan ${upVotesBy.length - 1} lainnya`
          : `and ${upVotesBy.length - 1} others`}
      </p>
    </>
  );
}

UpVotesInfo.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
  locale: PropTypes.string.isRequired,
};

export default UpVotesInfo;
