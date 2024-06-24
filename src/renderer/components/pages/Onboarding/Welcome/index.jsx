import { setTheme } from '@services/settings';
import { Sun, Moon, Monitor } from '@phosphor-icons/react';
import LightThemeImage from '@assets/images/lightTheme.png';
import DarkThemeImage from '@assets/images/darkTheme.png';
import SystemThemeImage from '@assets/images/systemTheme.png';
import { useState } from 'react';
import Section from '@components/pages/Onboarding/Section';
import styles from './styles.module.css';
import Button from '@components/generic/Button';

const Welcome = ({ handleStep }) => {
  const THEMES = [
    {
      id: 'light',
      name: 'Light Theme',
      description: 'Default theme for Stucado',
      image: LightThemeImage,
    },
    {
      id: 'dark',
      name: 'Dark Theme',
      description: 'Eye-friendly design for low light environments',
      image: DarkThemeImage,
    },
    {
      id: 'system',
      name: 'System Theme',
      description: 'Theme based on your system settings',
      image: SystemThemeImage,
    },
  ];

  const [selectedTheme, setSelectedTheme] = useState('system');

  const handleThemeChange = (theme) => {
    setTheme(theme);
    setSelectedTheme(theme);
  };

  return (
    <Section
      title="Welcome to Stucado"
      description="Stucado is a producitivity app targeted towards university students."
    >
      <h2>Get started</h2>
      <h3>Let&apos;s get you started by choosing your theme</h3>

      <div className={styles.welcome__themes}>
        {THEMES.map((theme) => (
          <div
            key={theme.id}
            name={theme.id}
            className={`${styles.welcome__theme} ${selectedTheme === theme.id ? styles.welcome__themeActive : ''}`}
            onClick={() => handleThemeChange(theme.id)}
          >
            <div className={styles.welcome__themeLeft}>
              <span className={styles.welcome__themeTitle}>
                {theme.id === 'light' && <Sun />}
                {theme.id === 'dark' && <Moon />}
                {theme.id === 'system' && <Monitor />}
                {theme.name}
              </span>
              <p className={styles.welcome__themeDescription}>{theme.description}</p>
            </div>
            <img className={styles.welcome__themeImage} src={theme.image} />
          </div>
        ))}
      </div>

      <div className={styles.welcome__footer}>
        <Button onClick={handleStep}>Continue</Button>
      </div>
    </Section>
  );
};

export default Welcome;
