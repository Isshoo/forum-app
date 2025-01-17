import React from 'react';
import { LocaleConsumer } from '../../contexts/LocaleContext';

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
        body: event.target.innerHTML,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    // this.props.addThread(this.state);
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
                  Tambahkan
                </button>
              </form>
            </div>
          );
        }}
      </LocaleConsumer>
    );
  }
}

export default CommentInput;
