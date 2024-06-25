import Widget from '@components/widgets/Widget';
import Histogram from '@components/widgets/Tracking/Histogram';
import Statistic from '@components/widgets/Tracking/Statistic';
import {
  getAverageProductivity,
  getHoursFocused,
  getTasksCompleted,
  getCurrentAverageProductivity,
  getCurrentHoursFocused,
  getCurrentTasksCompleted,
} from '@services/statistics';
import { useState, useEffect } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';

import styles from './styles.module.css';

export const Tracking = ({ title, unit, pastData, currentData }) => {
  // Choose to display upwards trend or downwards trend UI based on this
  const changePercentage = Math.min(
    ((currentData - pastData[pastData.length - 1]) / pastData[pastData.length - 1]) * 100,
    999
  );

  if (pastData.length + 1 < 7 && !currentData) {
    return (
      <Widget className={styles.tracking} title={title}>
        <div className={styles.tracking__content}>
          <div className={styles.tracking__loading}>
            <MagnifyingGlass size={24} />
            &nbsp; Not enough data collected
          </div>
        </div>
      </Widget>
    );
  }

  return (
    <Widget className={styles.tracking} title={title}>
      <div className={styles.tracking__content}>
        <>
          <Histogram data={pastData.concat(currentData)} />
          <Statistic value={currentData} unit={unit} trend={changePercentage || 0} />
        </>
      </div>
    </Widget>
  );
};

export const HoursFocused = () => {
  // Used to dynamically refresh this widget when the tasks are updated
  const tasks = useSelector((state) => state.tasks);

  const [hoursFocused, setHoursFocused] = useState([]);
  const [currentHoursFocused, setCurrentHoursFocused] = useState(null);

  useEffect(() => {
    getHoursFocused(7).then((result) => {
      setHoursFocused(result.map((stat) => stat.hoursFocused));
    });
    getCurrentHoursFocused().then((result) => {
      setCurrentHoursFocused(result);
    });
  }, [tasks]);

  return <Tracking title="Hours Focused" unit=" hrs" pastData={hoursFocused} currentData={currentHoursFocused} />;
};

export const TasksCompleted = () => {
  // Used to dynamically refresh this widget when the tasks are updated
  const tasks = useSelector((state) => state.tasks);

  const [tasksCompleted, setTasksCompleted] = useState([]);
  const [currentTasksCompleted, setCurrentTasksCompleted] = useState(null);

  useEffect(() => {
    getTasksCompleted(7).then((result) => {
      setTasksCompleted(result.map((stat) => stat.completedTasks));
    });
    getCurrentTasksCompleted().then((result) => {
      setCurrentTasksCompleted(result);
    });
  }, [tasks]);
  return <Tracking title="Tasks Completed" pastData={tasksCompleted} currentData={currentTasksCompleted} />;
};

export const AverageProductivity = () => {
  // Used to dynamically refresh this widget when the tasks are updated
  const tasks = useSelector((state) => state.tasks);

  const [averageProductivity, setAverageProductivity] = useState([]);
  const [currentAverageProductivity, setCurrentAverageProductivity] = useState(null);

  useEffect(() => {
    getAverageProductivity(7).then((result) => {
      setAverageProductivity(result.map((stat) => stat.averageProductivity));
    });
    getCurrentAverageProductivity().then((result) => {
      setCurrentAverageProductivity(Math.min(result || 0, 999)); // Clamp to 999
    });
  }, [tasks]);

  return (
    <Tracking
      title="Average Productivity"
      unit="%"
      pastData={averageProductivity}
      currentData={currentAverageProductivity}
    />
  );
};
