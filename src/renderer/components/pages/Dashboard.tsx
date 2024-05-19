import TasksList from 'Components/widgets/TasksList'
import Timetable from 'Components/widgets/Timetable'
import 'Styles/pages/dashboard.css'

const Dashboard: React.FC = () => {
  return <div className='dashboard'>
    <div 
      className='dashboard__widget'
      style={{ gridRow: 'span 1', gridColumn: 'span 1' }}
    >
      <TasksList />
    </div>
    <div 
      className='dashboard__widget'
      style={{ gridColumn: 'span 4' }}
    >
      <Timetable />
    </div>
  </div>
}

export default Dashboard