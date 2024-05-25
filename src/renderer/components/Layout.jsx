import { Outlet, NavLink } from 'react-router-dom';

import appIcon from '@assets/images/appIcon.png';
import userAvatar from '@assets/images/blankAvatar.webp';
import '@styles/layout.css';

import HomeIcon from '@assets/icons/home.svg?react';
import CalendarIcon from '@assets/icons/calendar.svg?react';
import StatisticsIcon from '@assets/icons/statistics.svg?react';
import SettingsIcon from '@assets/icons/settings.svg?react';

const NAV_LINKS = [
  { to: '/', icon: <HomeIcon /> },
  { to: '/timetable', icon: <CalendarIcon /> },
  { to: '/statistics', icon: <StatisticsIcon /> },
  { to: '/settings', icon: <SettingsIcon /> },
];

const Layout = () => {
  return (
    <>
      <aside className="navbar">
        {/* App icon */}
        <img className="navbar__app-icon" src={appIcon} alt="App icon" />

        {/* Navigation links */}
        <nav className="navbar__links-group">
          {NAV_LINKS.map(({ to, icon }, index) => (
            <NavLink
              key={index}
              className={({ isActive }) => (isActive ? 'navbar__link navbar__link--active' : 'navbar__link')}
              to={to}
            >
              {icon}
            </NavLink>
          ))}
        </nav>

        {/* User avatar */}
        <img className="navbar__user-avatar" src={userAvatar} alt="User avatar" />
      </aside>

      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
