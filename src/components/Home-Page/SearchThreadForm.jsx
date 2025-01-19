import React from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

function SearchThreadsForm({ keyword, keywordChange, locale }) {
  return (
    <form id="searchForm">
      <input
        type="text"
        id="searchInput"
        placeholder={locale === 'EN' ? 'Search title...' : 'Cari judul...'}
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
      <button type="submit" id="searchSubmit" disabled>
        <FaSearch className="search-icon" />
      </button>
    </form>
  );
}

SearchThreadsForm.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default SearchThreadsForm;
