import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import LocaleContext from '../../contexts/LocaleContext';
import { Dropdown, Select } from '../styled/Dropdown';

const CategoryDropdown = ({ categories, setCategory }) => {
  const { locale } = useContext(LocaleContext);
  return (
    <Dropdown>
      <Select onChange={(e) => setCategory(e.target.value)}>
        <option value="">{locale === 'EN' ? 'All Categories' : 'Semua Kategori'}</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
    </Dropdown>
  );
};

CategoryDropdown.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default CategoryDropdown;
