import { IconContext, SquaresFour, CalendarBlank, ChartLine, Faders, SignOut } from '@phosphor-icons/react';
import { Outlet, NavLink } from 'react-router-dom';

import blankAvatar from '@assets/images/blankAvatar.webp';
import appIcon from '@assets/images/appIcon.png';
import '@styles/generic/layout.css';

const NAVLINKS = [
  { icon: <SquaresFour />, text: 'Dashboard', to: '/' },
  { icon: <CalendarBlank />, text: 'Timetable', to: '/timetable' },
  { icon: <ChartLine />, text: 'Statistics', to: '/insights' },
  { icon: <Faders />, text: 'Settings', to: '/settings' },
];

const Layout = () => {
  return (
    <IconContext.Provider
      value={{
        size: 24,
        weight: 'regular',
        mirrored: false,
      }}
    >
      <aside className="sidebar">
        <div className="sidebar__icon-island">
          <img src={appIcon} alt="App Icon" className="sidebar__icon" />
          <h1 className="sidebar__title">Stucado</h1>
        </div>

        <div className="sidebar__page-island">
          {NAVLINKS.map(({ icon, text, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? 'sidebar__page sidebar__page--active' : 'sidebar__page sidebar__page--inactive'
              }
            >
              {icon}
              {text}
            </NavLink>
          ))}
        </div>

        <div className="sidebar__logout-island">
          <SignOut className="sidebar__logout" />
          <p className="sidebar__logout-text">Logout</p>
        </div>
      </aside>
      <section className="page">
        <div className="page__banner">
          <h2 className="page__title">Dashboard</h2>
          <div className="page__user-profile">
            <img src={blankAvatar} alt="User avatar" className="page__user-avatar" />
            <span className="page__user-details">
              <p className="page__user-name">John Doe</p>
              <p className="page__user-email">johnnydoe@gmail.com</p>
            </span>
          </div>
        </div>
        <Outlet />
      </section>
    </IconContext.Provider>
  );
};

export default Layout;
