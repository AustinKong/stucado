import '@styles/pages/dashboard.css';
import TaskList from '@components/widgets/TaskList';
import Timetable from '@components/widgets/Timetable';
import Pomodoro from '@components/widgets/Pomodoro';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <TaskList />
      <Timetable />
      <Pomodoro />
      <div>Widget 1</div>
      <div>Widget 2</div>
      <div>Widget 3</div>
    </div>
  );
};

export default Dashboard;
