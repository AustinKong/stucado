import Widget from '@components/widgets/Widget';
import Histogram from '@components/widgets/Tracking/Histogram';
import Statistic from '@components/widgets/Tracking/Statistic';

import styles from './styles.module.css';

const Tracking = ({ title, unit, pastData, currentData }) => {
  // Choose to display upwards trend or downwards trend UI based on this
  const changePercentage = ((currentData - pastData[pastData.length - 1]) / pastData[pastData.length - 1]) * 100;

  return (
    <Widget className={styles.tracking} title={title}>
      <div className={styles.tracking__content}>
        <Histogram data={pastData.concat(currentData)} />
        <Statistic value={currentData} unit={unit} trend={changePercentage} />
      </div>
    </Widget>
  );
};

export const HoursFocused = () => {
  return <Tracking title="Hours Focused" unit=" hrs" pastData={[4, 5, 2, 3, 6, 3, 10, 5, 5, 12, 3]} currentData={3} />;
};

export const TasksCompleted = () => {
  return <Tracking title="Tasks Completed" pastData={[3, 32, 93, 12, 11, 94, 83]} currentData={88} />;
};

export const AverageProductivity = () => {
  return <Tracking title="Average Productivity" unit="%" pastData={[3, 32, 93, 12, 11, 94, 83]} currentData={55} />;
};
