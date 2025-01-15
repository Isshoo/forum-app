import React from 'react';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../../contexts/LocaleContext';

class FormAddThreads extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      category: '',
      titleMaxLength: 50,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onCategoryChangeEventHandler = this.onCategoryChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const maxLength = this.state.titleMaxLength;
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      this.setState(() => {
        return {
          title: inputValue,
        };
      });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      };
    });
  }

  onCategoryChangeEventHandler(event) {
    this.setState(() => {
      return {
        category: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addThread(this.state);
  }

  render() {
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <form id="threadForm" autoComplete="off" onSubmit={this.onSubmitEventHandler}>
              <div>
                <label htmlFor="title">{locale === 'EN' ? 'Title' : 'Judul'}</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder={locale === 'EN' ? 'Title' : 'Judul'}
                  aria-describedby="titleValidation"
                  value={this.state.title}
                  onChange={this.onTitleChangeEventHandler}
                />
                <p id="titleValidation" className="validation-message" aria-live="polite">
                  {locale === 'EN' ? 'Numbers of characters left :' : 'Jumlah karakter tersisa :'}{' '}
                  {this.state.titleMaxLength - this.state.title.length}
                </p>
              </div>
              <div>
                <label htmlFor="category">{locale === 'EN' ? 'Category' : 'Kategori'}</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder={locale === 'EN' ? 'Category' : 'Kategori'}
                  aria-describedby="categoryValidation"
                  value={this.state.category}
                  onChange={this.onCategoryChangeEventHandler}
                />
                <p id="categoryValidation" className="validation-message" aria-live="polite"></p>
              </div>
              <div>
                <label>{locale === 'EN' ? 'Description' : 'Deskripsi'}</label>
                <div
                  id="description"
                  data-placeholder={locale === 'EN' ? 'Description' : 'Deskripsi'}
                  aria-describedby="descriptionValidation"
                  contentEditable
                  required
                  onInput={this.onBodyChangeEventHandler}
                ></div>
                <p id="descriptionValidation" className="validation-message" aria-live="polite"></p>
              </div>
              <button type="submit" id="threadsSubmit">
                {locale === 'EN' ? 'Add' : 'Tambahkan'}
              </button>
            </form>
          );
        }}
      </LocaleConsumer>
    );
  }
}

FormAddThreads.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default FormAddThreads;
