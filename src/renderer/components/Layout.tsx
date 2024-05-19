import { Outlet, Link } from 'react-router-dom'
import HomeIcon from 'Assets/icons/home.svg?react'
import CalendarIcon from 'Assets/icons/calendar.svg?react'
import StatisticsIcon from 'Assets/icons/statistics.svg?react'
import SettingsIcon from 'Assets/icons/settings.svg?react'
import 'Styles/layout.css'

const Layout: React.FC = () => {
  /* TODO: Change colors of SVG https://fonts.google.com/icons?selected=Material+Symbols+Outlined:home:FILL@0;wght@400;GRAD@0;opsz@24&icon.size=24&icon.color=%23e8eaed&icon.platform=web */
  return <div className='layout'>
    <aside className='navbar'>
      <div className='navbar__app-icon'>
        🥑
      </div>

      <nav className='navbar__links-group'>
        <Link className='navbar__link' to="/">
          <HomeIcon />
        </Link>
        <Link className='navbar__link' to="/timetable">
          <CalendarIcon />
        </Link>
        <Link className='navbar__link' to="/statistics">
          <StatisticsIcon />
        </Link>
        <Link className='navbar__link' to="/settings">
          <SettingsIcon />
        </Link>
      </nav>

      <div className='navbar__user'>
        <img className='navbar__user-avatar' />
      </div>
    </aside>

    <Outlet />
  </div>
}

export default Layout