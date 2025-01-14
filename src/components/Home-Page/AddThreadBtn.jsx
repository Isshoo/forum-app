import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

function AddThreadBtn() {
  return (
    <div id="addThreadBtn">
      <Link to="/threads/new">
        <FaPlus />
      </Link>
    </div>
  );
}

export default AddThreadBtn;
