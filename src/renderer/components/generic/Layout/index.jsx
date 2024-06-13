import { IconContext, SquaresFour, CalendarBlank, ChartLine, Faders, SignOut, Moon, Sun } from '@phosphor-icons/react';
import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

import { setTheme } from '@services/settings';
import blankAvatar from '@assets/images/blankAvatar.webp';
import appIcon from '@assets/images/appIcon.png';
import './styles.css';

const NAVLINKS = [
  { icon: <SquaresFour />, to: '/' },
  { icon: <CalendarBlank />, to: '/schedule' },
  { icon: <ChartLine />, to: '/statistics' },
  { icon: <Faders />, to: '/settings' },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <img src={appIcon} alt="App Icon" className="sidebar__app-icon" />

      <nav className="sidebar__link-group">
        {NAVLINKS.map(({ icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link sidebar__link--inactive'
            }
          >
            <IconContext.Provider
              value={{
                size: 24,
              }}
            >
              {icon}
            </IconContext.Provider>
          </NavLink>
        ))}
      </nav>

      <SignOut className="sidebar__logout" size="24" />
    </aside>
  );
};

const PageBanner = () => {
  const location = useLocation();
  const locationName =
    location.pathname === '/'
      ? 'Dashboard'
      : location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2);

  return (
    <div className="page-banner">
      <h1 className="page-banner__title">{locationName}</h1>
      <ThemeToggle />
      <UserProfile />
    </div>
  );
};

const ThemeToggle = () => {
  const [selectedTheme, setSelectedTheme] = useState('light');

  const toggleTheme = () => {
    setSelectedTheme(selectedTheme === 'light' ? 'dark' : 'light');
    setTheme(selectedTheme);
  };

  return (
    <div className="page-banner__theme-toggle" onClick={toggleTheme}>
      {selectedTheme === 'light' ? <Moon size="24" /> : <Sun size="24" />}
    </div>
  );
};

const UserProfile = () => {
  return (
    <div className="page-banner__user-profile">
      <img src={blankAvatar} alt="User avatar" className="page-banner__user-avatar" />
      <span className="page-banner__user-details">
        <p className="page-banner__username">John Doe</p>
        <p className="page-banner__user-email">johndoe@gmail.com</p>
      </span>
    </div>
  );
};

const Layout = () => {
  return (
    <>
      <Sidebar />
      <PageBanner />
      <div className="page">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
