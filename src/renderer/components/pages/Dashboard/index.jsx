import './styles.css';
import TaskList from '@components/widgets/TaskList';
import Timetable from '@components/widgets/Timetable';
import Insights from '@components/widgets/Insights';
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
    </div>
  );
};

export default Dashboard;
