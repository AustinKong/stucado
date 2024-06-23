import { IconContext, SquaresFour, CalendarBlank, ChartLine, Faders, SignOut, Timer } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import { logout } from '@services/general';
import appIcon from '@assets/images/appIcon.png';
import styles from './styles.module.css';

const MAIN = [
  { icon: <SquaresFour />, to: '/' },
  { icon: <CalendarBlank />, to: '/schedule' },
  { icon: <ChartLine />, to: '/statistics' },
  { icon: <Timer />, to: '/pomodoro'}
];

const OTHER = [{ icon: <Faders />, to: '/settings' }];

const Group = ({ title, children }) => {
  return (
    <div className={styles.sidebar__group}>
      <small className={styles.sidebar__groupTitle}>{title}</small>
      {children}
    </div>
  );
};

const NavIcon = ({ icon, to }) => {
  return (
    <NavLink to={to} className={({ isActive }) => `${styles.navIcon} ${isActive ? styles.navIconActive : ''}`}>
      <IconContext.Provider
        value={{
          size: 24,
        }}
      >
        {icon}
      </IconContext.Provider>
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <img src={appIcon} alt="App Icon" className={styles.sidebar__appIcon} />

      <div className={styles.sidebar__divider} />

      <Group title="MAIN">
        {MAIN.map(({ icon, to }) => (
          <NavIcon key={to} icon={icon} to={to} />
        ))}
      </Group>

      <Group title="OTHER">
        {OTHER.map(({ icon, to }) => (
          <NavIcon key={to} icon={icon} to={to} />
        ))}
        <div className={styles.navIcon} onClick={() => logout()}>
          <SignOut size={24} />
        </div>
      </Group>
    </aside>
  );
};

export default Sidebar;
