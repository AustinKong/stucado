import { useState } from 'react';
import { IconContext, User, Book, House, Pencil, TestTube } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import { setTheme, setReceiveNotifications } from '@services/settings';
import { generateTestData } from '@services/experimental';
import DropdownPicker from '@components/generic/DropdownPicker';
import styles from './styles.module.css';
import Button from '@components/generic/Button';
import Construction from '@components/generic/Construction';

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
  {
    id: 'experimental',
    text: 'Experimental',
    long: 'Experimental Settings (for testing purposes only)',
    icon: <TestTube />,
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
        <h2 className={styles.settings__subpageTitle}>{NAVLINKS.find((navlink) => navlink.id === subpage).long}</h2>
        {subpage === 'general' && <GeneralSettings />}
        {subpage === 'profile' && <ProfileSettings />}
        {subpage === 'data' && <DataSettings />}
        {subpage === 'appearance' && <AppearanceSettings />}
        {subpage === 'experimental' && <ExperimentalSettings />}
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

const DataSettings = () => {
  return (
    <div>
      <SettingsButton
        title="Clear Data"
        description="Clear all data stored in the app. This action is irreversible."
        onClick={() => console.log('Clear data')}
        buttonText="Clear"
        buttonAppearance="danger"
      />
    </div>
  );
};

const ProfileSettings = () => {
  return <Construction />;
};

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

const ExperimentalSettings = () => {
  return (
    <div>
      <SettingsButton
        title="Generate Test Data"
        description="Populate the database with 14 days worth of randomly generated test data. Used for testing the functionality of the app."
        onClick={() => generateTestData()}
        buttonText="Generate"
      />
    </div>
  );
};

const SettingsButton = ({ title, description, onClick, buttonText, buttonAppearance }) => {
  return (
    <div className={styles.settingsButton} onClick={onClick}>
      <div className={styles.settingsButton__text}>
        <h3 className={styles.settingsButton__title}>{title}</h3>
        <p className={styles.settingsButton__description}>{description}</p>
      </div>
      <div className={styles.settingsButton__button}>
        <Button onClick={onClick} appearance={buttonAppearance}>
          {buttonText}
        </Button>
      </div>
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
