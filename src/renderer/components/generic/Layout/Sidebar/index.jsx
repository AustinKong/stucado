import {
  IconContext,
  SquaresFour,
  CalendarBlank,
  ChartLine,
  Faders,
  SignOut,
  Timer,
  Link,
} from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import { logout } from '@services/general';
import appIcon from '@assets/images/appIcon.png';
import styles from './styles.module.css';
import Modal, { ModalHeader, ModalTitle, ModalSubtitle, ModalBody, ModalFooter } from '@components/generic/Modal';
import Button from '@components/generic/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const MAIN = [
  { icon: <SquaresFour />, to: '/', testid: 'dashboard-icon' },
  { icon: <CalendarBlank />, to: '/schedule', testid: 'schedule-icon' },
  { icon: <ChartLine />, to: '/statistics', testid: 'statistics-icon' },
  { icon: <Timer />, to: '/pomodoro', testid: 'pomodoro-icon' },
];

const OTHER = [{ icon: <Faders />, to: '/settings', testid: 'settings-icon' }];

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
  const [signoutModalIsOpen, setSignoutModalIsOpen] = useState(false);
  const externalLink = useSelector((state) => state.settings.externalLink);

  return (
    <>
      <aside className={styles.sidebar}>
        <img src={appIcon} alt="App Icon" className={styles.sidebar__appIcon} />

        <div className={styles.sidebar__divider} />

        <Group title="MAIN">
          {MAIN.map(({ icon, to, testid }) => (
            <div key={to} data-testid={testid}>
              <NavIcon icon={icon} to={to} />
            </div>
          ))}
        </Group>

        <Group title="OTHER">
          {OTHER.map(({ icon, to, testid }) => (
            <div key={to} data-testid={testid}>
              <NavIcon icon={icon} to={to} />
            </div>
          ))}
          <a href={externalLink} className={styles.navIcon} target="blank">
            <Link size={24} />
          </a>
          <div className={styles.navIcon} onClick={() => setSignoutModalIsOpen(true)} data-testid="signout-icon">
            <SignOut size={24} />
          </div>
        </Group>
      </aside>
      {signoutModalIsOpen && <SignOutModal onClose={() => setSignoutModalIsOpen(false)} />}
    </>
  );
};

const SignOutModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Sign out</ModalTitle>
        <ModalSubtitle>Are you sure you want to sign out?</ModalSubtitle>
      </ModalHeader>
      <ModalBody>
        <p>Only sign out once you are done working for the day, else minimize or close the app in the top right.</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} appearance="secondary">
          Cancel
        </Button>
        <Button onClick={() => logout()} appearance="warn">
          Sign out
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Sidebar;
