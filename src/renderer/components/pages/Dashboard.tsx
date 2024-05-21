import TasksList from 'Components/widgets/TasksList'
import Timetable from 'Components/widgets/Timetable'
import 'Styles/pages/dashboard.css'

const Dashboard: React.FC = () => {
  const dateNow: string = new Date().toString().split(' ').slice(0, 4).join(' ');

  return <div className='dashboard'>
    <div className='dashboard__banner'>
      <h1 className='dashboard__date'>
        {dateNow}
      </h1>
    </div>

    <div className='dashboard__grid'>
      <TasksList />
    </div>
  </div>
}

export default Dashboard