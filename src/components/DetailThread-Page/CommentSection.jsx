import React from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

function CommentSection() {
  return (
    <div className="comment-section">
      <h3>Beri Komentar</h3>
      <CommentInput />
      <CommentList />
    </div>
  );
}

export default CommentSection;
