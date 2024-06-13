import './styles.css';
import TaskList from '@components/widgets/TaskList';
import Timetable from '@components/widgets/Timetable';
import Pomodoro from '@components/widgets/Pomodoro';
import Insights from '@components/widgets/Insights';
import PastProductivityLineChart from '@components/widgets/statistics/PastProductivityLineChart';
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
      <Pomodoro />
      <PastProductivityLineChart />
    </div>
  );
};

export default Dashboard;
