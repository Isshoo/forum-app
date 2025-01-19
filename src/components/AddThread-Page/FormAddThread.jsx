import React, { useState } from 'react';
import PropTypes from 'prop-types';

function FormAddThreads({ addThread, locale }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  const titleMaxLength = 50;
  const categoryMaxLength = 20;

  const onTitleChangeEventHandler = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= titleMaxLength) {
      setTitle(inputValue);
    }
  };

  const onBodyChangeEventHandler = (event) => {
    setBody(event.target.innerHTML);
  };

  const onCategoryChangeEventHandler = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= categoryMaxLength) {
      setCategory(inputValue);
    }
  };

  return (
    <form id="threadForm" autoComplete="off">
      <div>
        <label htmlFor="title">{locale === 'EN' ? 'Title' : 'Judul'}</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder={locale === 'EN' ? 'Title' : 'Judul'}
          aria-describedby="titleValidation"
          value={title}
          onChange={onTitleChangeEventHandler}
        />
        <p id="titleValidation" className="validation-message" aria-live="polite">
          {locale === 'EN' ? 'Numbers of characters left :' : 'Jumlah karakter tersisa :'}{' '}
          {titleMaxLength - title.length}
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
          value={category}
          onChange={onCategoryChangeEventHandler}
        />
        <p id="categoryValidation" className="validation-message" aria-live="polite"></p>
      </div>
      <div>
        <label>{locale === 'EN' ? 'Description' : 'Deskripsi'}</label>
        <div
          id="description"
          data-testid="Description"
          aria-label={locale === 'EN' ? 'Description' : 'Deskripsi'}
          data-placeholder={locale === 'EN' ? 'Description' : 'Deskripsi'}
          aria-describedby="descriptionValidation"
          contentEditable
          required
          onInput={onBodyChangeEventHandler}
        ></div>
        <p id="descriptionValidation" className="validation-message" aria-live="polite"></p>
      </div>
      <button type="button" id="threadsSubmit" onClick={() => addThread({ title, category, body })}>
        {locale === 'EN' ? 'Add' : 'Tambahkan'}
      </button>
    </form>
  );
}

FormAddThreads.propTypes = {
  addThread: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default FormAddThreads;
