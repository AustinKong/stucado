import blankAvatar from '@assets/images/blankAvatar.webp';
import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';
import { MagnifyingGlass } from '@phosphor-icons/react';
import Input from '@components/generic/Input';

const Banner = () => {
  // Gets location name based on React Router path
  const location = useLocation();
  // Capitalization done in CSS
  const locationName = location.pathname.replace('/', '') || 'dashboard';

  return (
    <div className={styles.banner}>
      <h3 className={styles.banner__title}>{locationName}</h3>
      <div style={{ width: '240px' }}>
        <Input icon={<MagnifyingGlass />} placeholder="Search or type a command" />
      </div>
      <UserProfile />
    </div>
  );
};

const UserProfile = () => {
  return (
    <div className={styles.profile}>
      <img src={blankAvatar} alt="User avatar" className={styles.profile__avatar} />
      <span className={styles.profile__details}>
        <p>Orbitee</p>
        <small>Made with 💖 by Team April</small>
      </span>
    </div>
  );
};

export default Banner;
