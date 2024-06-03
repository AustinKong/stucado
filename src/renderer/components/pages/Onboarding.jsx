import { useState } from 'react';
import { Sun, Moon, Monitor } from '@phosphor-icons/react';

import { setTheme } from '@services/settings'
import LightThemeImage from '@assets/images/lightTheme.png';
import '@styles/pages/onboarding.css';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const handleNextStep = () => setStep(step + 1);

  return (
    <>
      {step === 0 && <WelcomeSection handleStep={handleNextStep} />}
      {step === 1 && <h1>Step 2</h1>}
    </>
  );
};

const OnboardingSection = ({ title, description, children }) => {
  return (
    <div className="onboarding">
      <div className="onboarding__content">
        <h2 className="onboarding__title">{title}</h2>
        <p className="onboarding__description">{description}</p>
      </div>
      <div className="onboarding__interaction">{children}</div>
    </div>
  );
};

const WelcomeSection = ({ handleStep }) => {
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
      image: LightThemeImage,
    },
    {
      id: 'system',
      name: 'System Theme',
      description: 'Theme based on your system settings',
      image: LightThemeImage,
    },
  ];

  const [selectedTheme, setSelectedTheme] = useState('light');

  const handleThemeChange = (theme) => {
    setTheme(theme);
    setSelectedTheme(theme);
  };

  return (
    <OnboardingSection
      title="Welcome to Stucado"
      description="Stucado is a producitivity app targeted towards university students."
    >
      <h2 className="onboarding-interaction__title">Get started</h2>
      <h3 className="onboarding-interaction__subtitle">Let&apos;s get you started by choosing your theme</h3>

      <div className="welcome-section__themes">
        {THEMES.map((theme) => (
          <div
            key={theme.id}
            name={theme.id}
            className={
              selectedTheme === theme.id
                ? 'welcome-section__theme welcome-section__theme--active'
                : 'welcome-section__theme'
            }
            onClick={() => handleThemeChange(theme.id)}
          >
            <div className="welcome-section__theme-left">
              <span className="welcome-section__theme-title">
                {theme.id === 'light' && <Sun />}
                {theme.id === 'dark' && <Moon />}
                {theme.id === 'system' && <Monitor />}
                {theme.name}
              </span>
              <p className="welcome-section__theme-description">{theme.description}</p>
            </div>
            <img className="welcome-section__theme-image" src={theme.image} />
          </div>
        ))}
      </div>

      <div className="onboarding-interaction__footer">
        <button className="onboarding-interaction__button-primary" onClick={handleStep}>Continue</button>
      </div>
    </OnboardingSection>
  );
};

export default Onboarding;
