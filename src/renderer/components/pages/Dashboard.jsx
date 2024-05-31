import '@styles/pages/dashboard.css';
import TaskList from '@components/widgets/TaskList';
import Timetable from '@components/widgets/Timetable';
import Pomodoro from '@components/widgets/Pomodoro';
import Insights from '@components/widgets/Insights';
import Statistics from '@components/widgets/Statistics';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Insights />
      <Timetable />
      <Statistics />
      <TaskList />
      <Pomodoro />
    </div>
  );
};

export default Dashboard;
