import 'Styles/pages/dashboard.css'
import TasksList from 'Components/widgets/TasksList'
import Timetable from 'Components/widgets/Timetable'

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
    </div>
  </div>
}

export default Dashboard