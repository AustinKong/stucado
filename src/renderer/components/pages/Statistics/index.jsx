import styles from './styles.module.css';
import HoursFocusedHeatmap from '@components/widgets/statistics/HoursFocusedHeatmap';
import PastProductivityLineChart from '@components/widgets/statistics/PastProductivityLineChart';
import TasksCompletedLineChart from '@components/widgets/statistics/TasksCompletedLineChart';
import HoursFocusedLineChart from '@components/widgets/statistics/HoursFocusedLineChart';

const Statistics = () => {
  return (
    <div className={styles.statisticsPage}>
      <HoursFocusedHeatmap />
      <PastProductivityLineChart />
      <TasksCompletedLineChart />
      <HoursFocusedLineChart />
    </div>
  );
};

export default Statistics;
