import { Sun, Moon, SunHorizon } from '@phosphor-icons/react';
import { initializeModel } from '@services/insights';
import LightThemeImage from '@assets/images/lightTheme.png';
import { useState } from 'react';
import styles from './styles.module.css';
import Section from '@components/pages/Onboarding/Section';
import Button from '@components/generic/Button';

const Habits = ({ handleStep }) => {
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
    <Section
      title="Set up your habits"
      description="Set up your habits to get started with Stucado. This starts the model off with a basic understanding of your study and productivity habits."
    >
      <h1>Set up your habits</h1>
      <h3>Choose a productivity habit that best describes you.</h3>

      <div className={styles.habits}>
        {HABITS.map((habit) => (
          <div
            key={habit.id}
            name={habit.id}
            className={`${styles.habits__habit} ${selectedHabit === habit.id ? styles.habits__habitActive : ''}`}
            onClick={() => handlehabitChange(habit.id)}
          >
            <div className={styles.habits__habitLeft}>
              <span className={styles.habits__habitTitle}>
                {habit.id === 'earlyBird' && <SunHorizon />}
                {habit.id === 'afternoon' && <Sun />}
                {habit.id === 'nightOwl' && <Moon />}
                {habit.name}
              </span>
              <p className={styles.habits__habitDescription}>{habit.description}</p>
            </div>
            <img className={styles.habits__habitImage} src={habit.image} />
          </div>
        ))}
      </div>

      <div className={styles.habits__footer}>
        <Button onClick={handleSubmit}>Continue</Button>
      </div>
    </Section>
  );
};

export default Habits;
