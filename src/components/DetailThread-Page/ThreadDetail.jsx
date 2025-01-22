import React from 'react';
import PropTypes from 'prop-types';
import HeaderThreadDetail from './HeaderThreadDetail';
import BodyThreadDetail from './BodyThreadDetail';
import FooterThreadDetail from './FooterThreadDetail';

function ThreadDetail({
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  allUsers,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
  locale,
}) {
  return (
    <div className="thread-detail">
      <div className="threads-item-detail">
        <HeaderThreadDetail
          avatar={owner.avatar}
          name={owner.name}
          email={owner.email}
          createdAt={createdAt}
          locale={locale}
        />
        <BodyThreadDetail title={title} body={body} category={category} />
        <FooterThreadDetail
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUser={authUser}
          allUsers={allUsers}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralizeVote={onNeutralizeVote}
          locale={locale}
        />
      </div>
    </div>
  );
}

export const threadDetailShape = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
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
  locale: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  ...threadDetailShape,
};

export default ThreadDetail;
