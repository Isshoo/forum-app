import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { GoHome } from 'react-icons/go';
import { LocaleConsumer } from '../../contexts/LocaleContext';

function NavigationBar({ logout, username }) {
  const location = useLocation();

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <nav className="navigation-bar">
            <ul className="navigation">
              <li>
                <Link
                  id="allThreadsBtn"
                  className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}
                  to="/"
                >
                  <GoHome className="nav-icon" />
                  <p>{locale === 'EN' ? 'Home' : 'Beranda'}</p>
                </Link>
              </li>
              <li>
                <Link
                  id="archivedListBtn"
                  className={`nav-button ${location.pathname === '/leaderboard' ? 'active' : ''}`}
                  to="/leaderboard"
                >
                  <MdOutlineLeaderboard className="nav-icon" />
                  <p>{locale === 'EN' ? 'Leaderboard' : 'Peringkat'}</p>
                </Link>
              </li>
            </ul>
            <button className="logout" onClick={logout}>
              <p>{username}</p> <FiLogOut />
            </button>
          </nav>
        );
      }}
    </LocaleConsumer>
  );
}

NavigationBar.propTypes = {
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default NavigationBar;
