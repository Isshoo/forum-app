import React from 'react';
import { LocaleConsumer } from '../../contexts/LocaleContext';
import PropTypes from 'prop-types';

class CommentInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };

    this.onContentChangeEventHandler = this.onContentChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onContentChangeEventHandler(event) {
    this.setState(() => {
      return {
        content: event.target.innerHTML,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.onAddComment(this.state.content);
  }

  render() {
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <div className="comment-input">
              <form id="commentForm" autoComplete="off" onSubmit={this.onSubmitEventHandler}>
                <div>
                  <div
                    id="content"
                    data-placeholdercomment={
                      locale === 'EN'
                        ? 'Leave your comments here...'
                        : 'Berikan komentarmu disini...'
                    }
                    aria-describedby="contentValidation"
                    contentEditable
                    required
                    onInput={this.onContentChangeEventHandler}
                  ></div>
                </div>
                <button type="submit" id="commentSubmit">
                  {locale === 'EN' ? 'Submit' : 'Kirim'}
                </button>
              </form>
            </div>
          );
        }}
      </LocaleConsumer>
    );
  }
}

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default CommentInput;
