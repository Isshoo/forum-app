import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderThreadItem from './HeaderThreadItem';
import BodyThreadItem from './BodyThreadItem';
import FooterThreadItem from './FooterThreadItem';
import LocaleContext from '../../contexts/LocaleContext';

function ThreadItem({
  id,
  title,
  body,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  category,
  user,
  authUser,
  allUsers,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
}) {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="thread">
      <div className="threads-item">
        <HeaderThreadItem
          avatar={user.avatar}
          name={user.name}
          email={user.email}
          createdAt={createdAt}
        />
        <Link className="thread-body" to={`/threads/${id}`}>
          <BodyThreadItem title={title} body={body} category={category} />
        </Link>
        <FooterThreadItem
          id={id}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          totalComments={totalComments}
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

export const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  authUser: PropTypes.string.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ),
};

export default ThreadItem;
