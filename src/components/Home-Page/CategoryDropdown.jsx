import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';

const CategoryDropdown = ({ categories, setCategory }) => {
  const { locale } = useContext(LocaleContext);
  return (
    <div className="category-dropdown">
      <select onChange={(e) => setCategory(e.target.value)} className="category-select">
        <option value="">{locale === 'EN' ? 'All Categories' : 'Semua Kategori'}</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

CategoryDropdown.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default CategoryDropdown;
