import { useState } from 'react';
import { IconContext, User, Book, House, Pencil } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import { setTheme, setReceiveNotifications } from '@services/settings';
import './styles.css';

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
    <div className="settings">
      <div className="settings__navbar">
        <IconContext.Provider
          value={{
            size: 24,
          }}
        >
          {NAVLINKS.map(({ id, text, icon }) => {
            return (
              <div
                key={id}
                className={subpage === id ? 'settings__navlink settings__navlink--active' : 'settings__navlink'}
                onClick={() => setSubpage(id)}
              >
                {icon}
                {text}
              </div>
            );
          })}
        </IconContext.Provider>
      </div>
      <div className="settings__subpage">
        <div className="settings__subpage-title">{NAVLINKS.find((navlink) => navlink.id === subpage).long}</div>
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
  )
};

const SettingsToggle = ({ title, description, value, onChange }) => {
  return (
    <div title={title} className="settings-toggle">
      <div className="settings-toggle__text">
        <h3 className="setttings-toggle__title">{title}</h3>
        <p className="settings-toggle__description">{description}</p>
      </div>
      <label className="settings-toggle__label">
        <input type="checkbox" className="settings-toggle__input" checked={value} onChange={onChange} />
        <span className="settings-toggle__slider" />
      </label>
    </div>
  );
};

const SettingsDropdown = ({ title, description, value, options, onChange }) => {
  return (
    <div title={title} className="settings-dropdown">
      <div className="settings-dropdown__text">
        <h3 className="setttings-dropdown__title">{title}</h3>
        <p className="settings-dropdown__description">{description}</p>
      </div>
      <select className="settings-dropdown__select" value={value} onChange={onChange}>
        {options.map((option) => (
          <option className="settings-dropdown__option" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Settings;
