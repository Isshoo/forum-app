import React from 'react';
import UpVotesInfoDetail from '../components/DetailThread-Page/UpVotesInfoDetail';
import '../styles/detailThread-Page/threadDetail.css';

const story = {
  title: 'UpVotesInfoDetail',
  component: UpVotesInfoDetail,
};

export default story;

const TemplateStory = (args) => <UpVotesInfoDetail {...args} />;

const NoVotes = TemplateStory.bind({});
NoVotes.args = {
  upVotesBy: [],
  allUsers: [],
  locale: 'EN',
};

const SingleVote = TemplateStory.bind({});
SingleVote.args = {
  upVotesBy: ['user1'],
  allUsers: [
    {
      id: 'user1',
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
    },
  ],
  locale: 'EN',
};

const MultipleVotesEnglish = TemplateStory.bind({});
MultipleVotesEnglish.args = {
  upVotesBy: ['user1', 'user2', 'user3'],
  allUsers: [
    {
      id: 'user1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
    },
    {
      id: 'user2',
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
    },
    {
      id: 'user3',
      name: 'Alice Johnson',
      email: 'alicejohnson@example.com',
      avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
    },
  ],
  locale: 'EN',
};

const MultipleVotesIndonesia = TemplateStory.bind({});
MultipleVotesIndonesia.args = {
  upVotesBy: ['user1', 'user2', 'user3'],
  allUsers: [
    {
      id: 'user1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
    },
    {
      id: 'user2',
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
    },
    {
      id: 'user3',
      name: 'Alice Johnson',
      email: 'alicejohnson@example.com',
      avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
    },
  ],
  locale: 'ID',
};

export { NoVotes, SingleVote, MultipleVotesEnglish, MultipleVotesIndonesia };
