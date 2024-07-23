import { useState } from 'react';
import { IconContext, User, Book, House, Pencil, TestTube } from '@phosphor-icons/react';
import Input from '@components/generic/Input';
import DropdownPicker from '@components/generic/DropdownPicker';
import styles from './styles.module.css';
import Button from '@components/generic/Button';
import General from './General';
import Profile from './Profile';
import Data from './Data';
import Appearance from './Appearance';
import Experimental from './Experimental';

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
        <div className={styles.settings__subpageContent}>
          {subpage === 'general' && <General />}
          {subpage === 'profile' && <Profile />}
          {subpage === 'data' && <Data />}
          {subpage === 'appearance' && <Appearance />}
          {subpage === 'experimental' && <Experimental />}
        </div>
      </div>
    </div>
  );
};

export const SettingsButton = ({ title, description, onClick, buttonText, buttonAppearance }) => {
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

export const SettingsToggle = ({ title, description, value, onChange }) => {
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

export const SettingsDropdown = ({ title, description, value, options, onChange }) => {
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

export const SettingsInput = ({ title, description, value, onChange }) => {
  return (
    <div title={title} className={styles.settingsInput}>
      <div className={styles.settingsInput__text}>
        <h3 className={styles.setttingsInput__title}>{title}</h3>
        <p className={styles.settingsInput__description}>{description}</p>
      </div>
      <div className={styles.settingsInput__input}>
        <Input value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default Settings;
