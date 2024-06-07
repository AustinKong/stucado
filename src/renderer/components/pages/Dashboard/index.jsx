import './styles.css';
import TaskList from '@components/widgets/TaskList';
import Timetable from '@components/widgets/Timetable';
import Pomodoro from '@components/widgets/Pomodoro';
import Insights from '@components/widgets/Insights';
import Statistics from '@components/widgets/Statistics';
import HeatMap from '@components/widgets/Heatmap';
import { HoursFocused, TasksCompleted, AverageProductivity } from '@components/widgets/Tracking';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <HoursFocused />
      <TasksCompleted />
      <AverageProductivity />
      <TaskList />
      <Timetable />
      <Insights />
      <Statistics />
      <Pomodoro />
      <HeatMap />
    </div>
  );
};

export default Dashboard;
