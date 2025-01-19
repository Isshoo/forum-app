import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useEditable from '../../hooks/useEditable';

const CommentInput = ({ onAddComment, locale }) => {
  const [content, onContentChange] = useEditable('');

  return (
    <div className="comment-input">
      <form id="commentForm" autoComplete="off">
        <div>
          <div
            id="content"
            data-placeholdercomment={
              locale === 'EN' ? 'Leave your comments here...' : 'Berikan komentarmu disini...'
            }
            aria-label={locale === 'EN' ? 'Comment' : 'Komentar'}
            data-testid={locale === 'EN' ? 'Comment' : 'Komentar'}
            aria-describedby="contentValidation"
            contentEditable
            required
            onInput={onContentChange}
          ></div>
        </div>
        <button type="button" id="commentSubmit" onClick={() => onAddComment(content)}>
          {locale === 'EN' ? 'Submit' : 'Kirim'}
        </button>
      </form>
    </div>
  );
};

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default CommentInput;
