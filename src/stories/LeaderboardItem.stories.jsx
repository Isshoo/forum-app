import React from 'react';
import LeaderboardItem from '../components/Leaderboard-Page/LeaderboardItem';
import '../styles/Leaderboards-Page/leadearboards.css';

const story = {
  title: 'LeaderboardItem',
  component: LeaderboardItem,
};

export default story;

const TemplateStory = (args) => <LeaderboardItem {...args} />;

const DefaultType = TemplateStory.bind({});
DefaultType.args = {
  id: 'user1',
  avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
  name: 'John Doe',
  email: 'johndoe@example.com',
  score: 150,
  authUser: '',
};

const CurrentUser = TemplateStory.bind({});
CurrentUser.args = {
  id: 'user1',
  avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
  name: 'Jane Doe',
  email: 'janedoe@example.com',
  score: 200,
  authUser: 'user1',
};

export { DefaultType, CurrentUser };
