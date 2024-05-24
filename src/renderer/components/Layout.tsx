import { Outlet, NavLink } from 'react-router-dom'
import { ReactNode } from 'react'

import appIcon from 'Assets/images/appIcon.png'
import userAvatar from 'Assets/images/blankAvatar.webp'
import 'Styles/layout.css'

import HomeIcon from 'Assets/icons/home.svg?react'
import CalendarIcon from 'Assets/icons/calendar.svg?react'
import StatisticsIcon from 'Assets/icons/statistics.svg?react'
import SettingsIcon from 'Assets/icons/settings.svg?react'

const NAV_LINKS: { to: string, icon: ReactNode }[] = [
  { to: '/', icon: <HomeIcon /> },
  { to: '/timetable', icon: <CalendarIcon /> },
  { to: '/statistics', icon: <StatisticsIcon /> },
  { to: '/settings', icon: <SettingsIcon /> },
]

const Layout: React.FC = () => {
  return <>
    <aside className='navbar'>
      {/* App icon */}
      <img className='navbar__app-icon' src={appIcon} alt='App icon' />

      {/* Navigation links */}
      <nav className='navbar__links-group'>
        {
          NAV_LINKS.map(({ to, icon }, index) => (
            <NavLink 
              key={index}
              className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
              to={to}>
              {icon}
            </NavLink>
          ))}
      </nav>

      {/* User avatar */}
      <img className='navbar__user-avatar' 
        src={userAvatar} 
        alt='User avatar'/>
    </aside>

    <div className='content'>
      <Outlet />
    </div>
  </>
}

export default Layout