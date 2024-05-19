import { Outlet, Link } from 'react-router-dom'

const Layout: React.FC = () => {
  return <>
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
          <Link to="/timetable">Timetable</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </>
}

export default Layout