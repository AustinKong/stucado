import { IconContext, SquaresFour, CalendarBlank, ChartLine, Faders, SignOut } from '@phosphor-icons/react';
import { Outlet, NavLink } from 'react-router-dom';

import appIcon from '@assets/images/appIcon.png';
import '@styles/generic/layout.css';

const NAVLINKS = [
  { icon: <SquaresFour />, to: '/' },
  { icon: <CalendarBlank />, to: '/timetable' },
  { icon: <ChartLine />, to: '/insights' },
  { icon: <Faders />, to: '/settings' },
];

const Layout = () => {
  return (
    <IconContext.Provider
      value={{
        size: 32,
        weight: 'regular',
        mirrored: false,
      }}
    >
      <aside className="sidebar">
        <div className="sidebar__icon-island">
          <img src={appIcon} alt="App Icon" className="sidebar__icon" />
        </div>

        <div className="sidebar__page-island">
          {NAVLINKS.map(({ icon, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? 'sidebar__page sidebar__page--active' : 'sidebar__page sidebar__page--inactive'
              }
            >
              {icon}
            </NavLink>
          ))}
        </div>

        <div className="sidebar__logout-island">
          <SignOut className="sidebar__logout" />
        </div>
      </aside>
      <section className="page">
        <Outlet />
      </section>
    </IconContext.Provider>
  );
};

export default Layout;
