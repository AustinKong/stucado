import { Outlet, Link } from 'react-router-dom'
import HomeIcon from 'Assets/icons/home.svg?react'
import CalendarIcon from 'Assets/icons/calendar.svg?react'
import StatisticsIcon from 'Assets/icons/statistics.svg?react'
import SettingsIcon from 'Assets/icons/settings.svg?react'
import appIcon from 'Assets/images/appIcon.png'
import userAvatar from 'Assets/images/blankAvatar.webp'
import 'Styles/layout.css'

const Layout: React.FC = () => {
  return <>
    <aside className='navbar'>
      <img className='navbar__app-icon' src={appIcon} alt='App icon' />

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

      <img className='navbar__user-avatar' src={userAvatar} alt='User avatar'/>
    </aside>

    <Outlet />
  </>
}

export default Layout