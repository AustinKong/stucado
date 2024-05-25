import '@styles/pages/dashboard.css';
import TasksList from '@components/widgets/TasksList';
import Timetable from '@components/widgets/Timetable';
import Insights from '@components/widgets/Insights';

const Dashboard = () => {
  const dateNow = new Date().toString().split(' ').slice(0, 4).join(' ');

  return (
    <div className="dashboard">
      <div className="dashboard__banner">
        <span>Dashboard</span>
        &nbsp;
        <span className="dashboard__date">{dateNow}</span>
      </div>

      <div className="dashboard__content">
        <Timetable />
        <TasksList />
        <Insights />
      </div>
    </div>
  );
};

export default Dashboard;
