import React from 'react';
import FooterThreadItem from '../components/Home-Page/FooterThreadItem';
import { MemoryRouter } from 'react-router-dom';
import '../styles/Home-Page/threadItem.css';
import '../styles/Base/main.css';

const story = {
  title: 'FooterThreadItem',
  component: FooterThreadItem,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

export default story;

const TemplateStory = (args) => <FooterThreadItem {...args} />;

const DefaultEN = TemplateStory.bind({});
DefaultEN.args = {
  id: 'thread1',
  upVotesBy: ['user1', 'user2'],
  downVotesBy: ['user3'],
  totalComments: 5,
  authUser: 'user1',
  allUsers: [
    { id: 'user1', name: 'John Doe', email: 'john@example.com', avatar: '' },
    { id: 'user2', name: 'Jane Smith', email: 'jane@example.com', avatar: '' },
    { id: 'user3', name: 'Michael Brown', email: 'michael@example.com', avatar: '' },
  ],
  onUpVote: () => alert('Up voted!'),
  onDownVote: () => alert('Down voted!'),
  onNeutralizeVote: () => alert('Vote neutralized!'),
  locale: 'EN',
};

const ActiveUpVote = TemplateStory.bind({});
ActiveUpVote.args = {
  ...DefaultEN.args,
  authUser: 'user1',
};

const ActiveDownVote = TemplateStory.bind({});
ActiveDownVote.args = {
  ...DefaultEN.args,
  authUser: 'user3',
};

const NeutralVote = TemplateStory.bind({});
NeutralVote.args = {
  ...DefaultEN.args,
  authUser: 'user4',
};

const WithCommentsID = TemplateStory.bind({});
WithCommentsID.args = {
  ...DefaultEN.args,
  locale: 'ID',
};

export { ActiveUpVote, ActiveDownVote, NeutralVote, WithCommentsID };
