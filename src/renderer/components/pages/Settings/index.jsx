import { useState } from 'react';
import { IconContext, User, Book, House, Pencil } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import { setTheme, setReceiveNotifications } from '@services/settings';
import DropdownPicker from '@components/generic/DropdownPicker';
import styles from './styles.module.css';

const NAVLINKS = [
  {
    id: 'general',
    text: 'General',
    long: 'General Settings',
    icon: <House />,
  },
  {
    id: 'profile',
    text: 'My Profile',
    long: 'Profile Settings',
    icon: <User />,
  },
  {
    id: 'data',
    text: 'Data',
    long: 'Data & Security',
    icon: <Book />,
  },
  {
    id: 'appearance',
    text: 'Appearance',
    long: 'Appearance & Personalization',
    icon: <Pencil />,
  },
];

const Settings = () => {
  const [subpage, setSubpage] = useState('general');

  return (
    <div className={styles.settings}>
      <div className={styles.settings__navbar}>
        <IconContext.Provider
          value={{
            size: 24,
          }}
        >
          {NAVLINKS.map(({ id, text, icon }) => {
            return (
              <div
                key={id}
                className={`${styles.settings__navlink} ${subpage === id ? styles.settings__navlinkActive : ''}`}
                onClick={() => setSubpage(id)}
              >
                {icon}
                {text}
              </div>
            );
          })}
        </IconContext.Provider>
      </div>
      <div className={styles.settings__subpage}>
        <div className={styles.settings__subpageTitle}>{NAVLINKS.find((navlink) => navlink.id === subpage).long}</div>
        {subpage === 'general' && <GeneralSettings />}
        {subpage === 'profile' && <ProfileSettings />}
        {subpage === 'data' && <DataSettings />}
        {subpage === 'appearance' && <AppearanceSettings />}
      </div>
    </div>
  );
};

const GeneralSettings = () => {
  const settings = useSelector((state) => state.settings);

  return (
    <div>
      <SettingsToggle
        title="Notifications"
        description="Receive notifications for important events and pomodoro reminders"
        value={settings.receiveNotifications}
        onChange={() => setReceiveNotifications(!settings.receiveNotifications)}
      />
    </div>
  );
};

const DataSettings = () => {};

const ProfileSettings = () => {};

const AppearanceSettings = () => {
  const settings = useSelector((state) => state.settings);

  return (
    <div>
      <SettingsDropdown
        title="Theme"
        description="Choose your preferred theme"
        value={settings.theme}
        options={[
          { value: 'system', label: 'System Default' },
          { value: 'light', label: 'Light Theme' },
          { value: 'dark', label: 'Dark Theme' },
        ]}
        onChange={(e) => setTheme(e.target.value)}
      />
    </div>
  );
};

const SettingsToggle = ({ title, description, value, onChange }) => {
  return (
    <div title={title} className={styles.settingsToggle}>
      <div className={styles.settingsToggle__text}>
        <h3 className={styles.setttingsToggle__title}>{title}</h3>
        <p className={styles.settingsToggle__description}>{description}</p>
      </div>
      <label className={styles.settingsToggle__label}>
        <input type="checkbox" className={styles.settingsToggle__input} checked={value} onChange={onChange} />
        <span className={styles.settingsToggle__slider} />
      </label>
    </div>
  );
};

const SettingsDropdown = ({ title, description, value, options, onChange }) => {
  return (
    <div title={title} className={styles.settingsDropdown}>
      <div className={styles.settingsDropdown__text}>
        <h3 className={styles.setttingsDropdown__title}>{title}</h3>
        <p className={styles.settingsDropdown__description}>{description}</p>
      </div>
      <div className={styles.settingsDropdown__picker}>
        <DropdownPicker options={options} onSelect={onChange} value={value} />
      </div>
    </div>
  );
};

export default Settings;
