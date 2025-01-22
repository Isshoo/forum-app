import React from 'react';
import ThreadDetail from '../components/DetailThread-Page/ThreadDetail';
import '../styles/style';

const story = {
  title: 'ThreadDetail',
  component: ThreadDetail,
};

export default story;

const TemplateStory = (args) => <ThreadDetail {...args} />;

const DefaultThread = TemplateStory.bind({});
DefaultThread.args = {
  title: 'Sample Thread Title',
  body: 'This is a sample thread body with <strong>formatted text</strong> and HTML content.',
  category: 'General',
  createdAt: '2025-01-21T10:30:00Z',
  owner: {
    id: 'user1',
    name: 'John Doe',
    avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
    email: 'john.doe@example.com',
  },
  upVotesBy: ['user2', 'user3'],
  downVotesBy: ['user4'],
  authUser: 'user1',
  allUsers: [
    {
      id: 'user1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
    },
    {
      id: 'user2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
    },
    {
      id: 'user3',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
    },
    {
      id: 'user4',
      name: 'Emily White',
      email: 'emily.white@example.com',
      avatar: 'https://res.cloudinary.com/dtkczgmyn/image/upload/v1731896144/samples/smile.jpg',
    },
  ],
  onUpVote: () => alert('Up voted!'),
  onDownVote: () => alert('Down voted!'),
  onNeutralizeVote: () => alert('Vote neutralized!'),
};

const UpVotedByAuthUser = TemplateStory.bind({});
UpVotedByAuthUser.args = {
  ...DefaultThread.args,
  upVotesBy: ['user2', 'user1'], // Auth user has upvoted
  downVotesBy: [],
};

const DownVotedByAuthUser = TemplateStory.bind({});
DownVotedByAuthUser.args = {
  ...DefaultThread.args,
  upVotesBy: [],
  downVotesBy: ['user1'], // Auth user has downvoted
};

const NeutralVotes = TemplateStory.bind({});
NeutralVotes.args = {
  ...DefaultThread.args,
  upVotesBy: [],
  downVotesBy: [],
};

const LongThreadContent = TemplateStory.bind({});
LongThreadContent.args = {
  ...DefaultThread.args,
  body: `
    <p>This is a very long thread content. It contains multiple paragraphs, headers, and more.</p>
    <h2>Header 1</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula magna at neque malesuada, et tempor arcu aliquam.</p>
    <h2>Header 2</h2>
    <p>Aliquam erat volutpat. Sed sit amet diam id erat luctus vehicula id non lorem.</p>
    <p>Curabitur lacinia nec neque nec sollicitudin. Praesent fringilla suscipit ante, a vestibulum massa dictum nec.</p>
  `,
};

export { DefaultThread, UpVotedByAuthUser, DownVotedByAuthUser, NeutralVotes, LongThreadContent };
