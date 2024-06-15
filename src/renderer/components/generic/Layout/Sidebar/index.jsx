import { IconContext, SquaresFour, CalendarBlank, ChartLine, Faders, SignOut } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import appIcon from '@assets/images/appIcon.png';
import styles from './styles.module.css';

const NAVLINKS = [
  { icon: <SquaresFour />, to: '/' },
  { icon: <CalendarBlank />, to: '/schedule' },
  { icon: <ChartLine />, to: '/statistics' },
  { icon: <Faders />, to: '/settings' },
];

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <img src={appIcon} alt="App Icon" className={styles.sidebar__appIcon} />

      <nav className={styles.sidebar__navLinks}>
        {NAVLINKS.map(({ icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `${styles.sidebar__navLink} ${isActive ? styles.sidebar__navLinkActive : ''}`}
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

      <SignOut className={styles.sidebar__logout} size="24" />
    </aside>
  );
};

export default Sidebar;
