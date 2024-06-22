import Widget from '@components/widgets/Widget';
import Histogram from '@components/widgets/Tracking/Histogram';
import Statistic from '@components/widgets/Tracking/Statistic';
import { getAverageProductivity, getHoursFocused, getTasksCompleted } from '@services/statistics';
import { useState, useEffect } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';

import styles from './styles.module.css';

const Tracking = ({ title, unit, pastData, currentData }) => {
  // Choose to display upwards trend or downwards trend UI based on this
  const changePercentage = ((currentData - pastData[pastData.length - 1]) / pastData[pastData.length - 1]) * 100;

  return (
    <Widget className={styles.tracking} title={title}>
      <div className={styles.tracking__content}>
        {pastData.length + 1 >= 7 && (
          <>
            <Histogram data={pastData.concat(currentData)} />
            <Statistic value={currentData} unit={unit} trend={changePercentage} />
          </>
        )}
        {pastData.length + 1 < 7 && (
          <div className={styles.tracking__loading}>
            <MagnifyingGlass size={24} />
            &nbsp; Trying to get more data...
          </div>
        )}
      </div>
    </Widget>
  );
};

export const HoursFocused = () => {
  const [hoursFocused, setHoursFocused] = useState([]);

  useEffect(() => {
    getHoursFocused(7).then((result) => {
      setHoursFocused(result.map((stat) => stat.hoursFocused));
    });
  }, []);

  return <Tracking title="Hours Focused" unit=" hrs" pastData={hoursFocused} currentData={0} />;
};

export const TasksCompleted = () => {
  const [tasksCompleted, setTasksCompleted] = useState([]);

  useEffect(() => {
    getTasksCompleted(7).then((result) => {
      setTasksCompleted(result.map((stat) => stat.completedTasks));
    });
  }, []);
  return <Tracking title="Tasks Completed" pastData={tasksCompleted} currentData={0} />;
};

export const AverageProductivity = () => {
  const [averageProductivity, setAverageProductivity] = useState([]);

  useEffect(() => {
    getAverageProductivity(7).then((result) => {
      setAverageProductivity(result.map((stat) => stat.averageProductivity));
    });
  }, []);

  return <Tracking title="Average Productivity" unit="%" pastData={averageProductivity} currentData={0} />;
};
