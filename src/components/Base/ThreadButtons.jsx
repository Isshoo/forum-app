import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaFolderPlus, FaFolderMinus, FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

function ThreadButtons({ id, archived, onDelete, onArchive }) {
  const location = useLocation();
  return (
    <div className={`buttons ${location.pathname.startsWith('/threads/') ? 'detail' : ''}`}>
      {archived ? (
        <button
          className={`btn-unarchive thread-btn ${location.pathname.startsWith('/threads/') ? 'detail' : ''}`}
          onClick={() => onArchive(id)}
        >
          <FaFolderMinus />
        </button>
      ) : (
        <button
          className={`btn-archive thread-btn ${location.pathname.startsWith('/threads/') ? 'detail' : ''}`}
          onClick={() => onArchive(id)}
        >
          <FaFolderPlus />
        </button>
      )}
      <button
        className={`btn-delete thread-btn ${location.pathname.startsWith('/threads/') ? 'detail' : ''}`}
        onClick={() => onDelete(id)}
      >
        <FaTrashAlt className="delete-icon" />
      </button>
    </div>
  );
}

ThreadButtons.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default ThreadButtons;
