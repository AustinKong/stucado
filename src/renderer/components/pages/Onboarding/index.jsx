import { useState } from 'react';
import { Sun, Moon, Monitor, SunHorizon } from '@phosphor-icons/react';

import { setTheme, completeOnboarding } from '@services/settings';
import { uploadTimetable } from '@services/timetable';
import { initializeModel } from '@services/insights';
import LightThemeImage from '@assets/images/lightTheme.png';
import UploadInstructions1 from '@assets/images/uploadInstructions1.png';
import UploadInstructions2 from '@assets/images/uploadInstructions2.png';
import './styles.css';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const handleNextStep = () => {
    if (step == 2) void completeOnboarding();
    setStep(step + 1);
  };

  return (
    <>
      {step === 0 && <WelcomeSection handleStep={handleNextStep} />}
      {step === 1 && <UploadSection handleStep={handleNextStep} />}
      {step === 2 && <HabitsSection handleStep={handleNextStep} />}
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

  const [selectedTheme, setSelectedTheme] = useState('system');

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
        <button className="onboarding-interaction__button-primary" onClick={handleStep}>
          Continue
        </button>
      </div>
    </OnboardingSection>
  );
};

const UploadSection = ({ handleStep }) => {
  const [timetableUrl, setTimetableUrl] = useState('');

  const handleSubmit = () => {
    uploadTimetable(timetableUrl);
    handleStep();
  };

  return (
    <OnboardingSection
      title="Upload your timetable"
      description="Upload your timetable to get started with Stucado. This enables access to features such as timetable widget, timetable optimization and productiviy analysis."
    >
      <h2 className="onboarding-interaction__title">Upload your timetable</h2>
      <h3 className="onboarding-interaction__subtitle">
        Upload your NUS Mods timetable by pasting the URL from the website.
      </h3>

      <div className="upload-section__instructions">
        <div className="upload-section__step">
          <img className="upload-section__step-image" src={UploadInstructions1} />
          <p className="upload-section__step-description">
            Head over to NUS Mods and click on the &quot;Share/Sync&quot; button
          </p>
        </div>
        <div className="upload-section__step">
          <img className="upload-section__step-image" src={UploadInstructions2} />
          <p className="upload-section__step-description">
            Copy the URL by pressing the red button, and paste it in the input field below
          </p>
        </div>
      </div>
      <input
        type="text"
        className="upload-section__input"
        value={timetableUrl}
        placeholder="Paste your NUS Mods timetable URL here"
        onChange={(event) => setTimetableUrl(event.target.value)}
      />

      <div className="onboarding-interaction__footer">
        <button className="onboarding-interaction__button-secondary" onClick={handleStep}>
          Skip
        </button>
        <button className="onboarding-interaction__button-primary" onClick={handleSubmit}>
          Upload Timetable
        </button>
      </div>
    </OnboardingSection>
  );
};

const HabitsSection = ({ handleStep }) => {
  const HABITS = [
    {
      id: 'earlyBird',
      name: 'Early Bird',
      description: 'You are most productive in the morning',
      image: LightThemeImage,
    },
    {
      id: 'afternoon',
      name: 'Afternoon',
      description: 'You are most productive in the afternoon',
      image: LightThemeImage,
    },
    {
      id: 'nightOwl',
      name: 'Night Owl',
      description: 'You are most productive at night',
      image: LightThemeImage,
    },
  ];

  const [selectedHabit, setSelectedHabit] = useState('afternoon');

  const handlehabitChange = (habit) => {
    setSelectedHabit(habit);
  };

  const handleSubmit = () => {
    void initializeModel(selectedHabit);
    handleStep();
  };

  return (
    <OnboardingSection
      title="Set up your habits"
      description="Set up your habits to get started with Stucado. This starts the model off with a basic understandinf of your study and productivity habits."
    >
      <h2 className="onboarding-interaction__title">Set up your habits</h2>
      <h3 className="onboarding-interaction__subtitle">Choose a productivity habit that best describes you.</h3>

      <div className="habits-section__habits">
        {HABITS.map((habit) => (
          <div
            key={habit.id}
            name={habit.id}
            className={
              selectedHabit === habit.id
                ? 'habits-section__habit habits-section__habit--active'
                : 'habits-section__habit'
            }
            onClick={() => handlehabitChange(habit.id)}
          >
            <div className="habits-section__habit-left">
              <span className="habits-section__habit-title">
                {habit.id === 'earlyBird' && <SunHorizon />}
                {habit.id === 'afternoon' && <Sun />}
                {habit.id === 'nightOwl' && <Moon />}
                {habit.name}
              </span>
              <p className="habits-section__habit-description">{habit.description}</p>
            </div>
            <img className="habits-section__habit-image" src={habit.image} />
          </div>
        ))}
      </div>

      <div className="onboarding-interaction__footer">
        <button className="onboarding-interaction__button-primary" onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </OnboardingSection>
  );
};

export default Onboarding;
