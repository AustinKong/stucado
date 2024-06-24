import { IconContext, SquaresFour, CalendarBlank, ChartLine, Faders, SignOut, Timer } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import { logout } from '@services/general';
import appIcon from '@assets/images/appIcon.png';
import styles from './styles.module.css';
import Modal, { ModalHeader, ModalTitle, ModalSubtitle, ModalBody, ModalFooter } from '@components/generic/Modal';
import Button from '@components/generic/Button';
import { useState } from 'react';

const MAIN = [
  { icon: <SquaresFour />, to: '/' },
  { icon: <CalendarBlank />, to: '/schedule' },
  { icon: <ChartLine />, to: '/statistics' },
  { icon: <Timer />, to: '/pomodoro' },
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
  const [signoutModalIsOpen, setSignoutModalIsOpen] = useState(false);

  return (
    <>
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
          <div className={styles.navIcon} onClick={() => setSignoutModalIsOpen(true)}>
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
