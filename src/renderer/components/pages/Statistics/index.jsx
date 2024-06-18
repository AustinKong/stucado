import './styles.css';
import Summary from '@components/widgets/statistics/Summary';
import HoursFocusedHeatmap from '@components/widgets/statistics/HoursFocusedHeatmap';
import PastProductivityLineChart from '@components/widgets/statistics/PastProductivityLineChart';
import TasksCompletedLineChart from '@components/widgets/statistics/TasksCompletedLineChart';
import HoursFocusedLineChart from '@components/widgets/statistics/HoursFocusedLineChart';

const Statistics = () => {
  return (
    <div className="statistics-page">
      <HoursFocusedHeatmap />
      <PastProductivityLineChart />
      <TasksCompletedLineChart />
      <HoursFocusedLineChart />
    </div>
  );
};

export default Statistics;
