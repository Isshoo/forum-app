import React from 'react';
import CommentItem from '../components/DetailThread-Page/CommentItem';
import '../styles/detailThread-Page/comments.css';
import '../styles/detailThread-Page/threadDetail.css';

export default {
  title: 'CommentItem',
  component: CommentItem,
};

const TemplateStory = (args) => <CommentItem {...args} />;

export const DefaultEN = TemplateStory.bind({});
DefaultEN.args = {
  id: 'comment1',
  content: '<p>This is a test comment</p>',
  createdAt: '2025-01-21T10:30:00Z',
  owner: {
    id: 'user1',
    name: 'John Doe',
    avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
  },
  upVotesBy: ['user2'],
  downVotesBy: ['user3'],
  authUser: 'user1',
  onUpVoteComment: () => alert('Upvoted!'),
  onDownVoteComment: () => alert('Downvoted!'),
  onNeutralizeVoteComment: () => alert('Vote neutralized!'),
  locale: 'EN',
};

export const UpVotedByUser = TemplateStory.bind({});
UpVotedByUser.args = {
  ...DefaultEN.args,
  upVotesBy: ['user1'],
  authUser: 'user1',
};

export const DownVotedByUser = TemplateStory.bind({});
DownVotedByUser.args = {
  ...DefaultEN.args,
  downVotesBy: ['user1'],
  authUser: 'user1',
};

export const NoVotes = TemplateStory.bind({});
NoVotes.args = {
  ...DefaultEN.args,
  upVotesBy: [],
  downVotesBy: [],
  authUser: 'user4',
};

export const DefaultID = TemplateStory.bind({});
DefaultID.args = {
  ...DefaultEN.args,
  locale: 'ID',
};
