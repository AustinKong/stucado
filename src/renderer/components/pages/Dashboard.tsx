import 'Styles/pages/dashboard.css'
import TasksList from 'Components/widgets/TasksList'
import Timetable from 'Components/widgets/Timetable'
import Insights from 'Components/widgets/Insights'

const Dashboard: React.FC = () => {
  const dateNow: string = new Date().toString().split(' ').slice(0, 4).join(' ');

  return <div className='dashboard'>
    <div className='dashboard__banner'>
      <span>
        Dashboard
      </span>
      &nbsp;
      <span className='dashboard__date'>
        {dateNow}
      </span>
    </div>

    <div className='dashboard__content'>
      <Timetable />
      <TasksList />
      <Insights />
    </div>
  </div>
}

export default Dashboard