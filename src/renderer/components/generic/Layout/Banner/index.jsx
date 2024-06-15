import { useLocation } from 'react-router-dom';
import blankAvatar from '@assets/images/blankAvatar.webp';
import styles from './styles.module.css';

const Banner = () => {
  // Gets location name based on React Router path
  const location = useLocation();
  // Capitalization done in CSS
  const locationName = location.pathname.replace('/', '') || 'dashboard';

  return (
    <div className={styles.banner}>
      <h1 className={styles.banner__title}>{locationName}</h1>
      <UserProfile />
    </div>
  );
};

const UserProfile = () => {
  return (
    <div className={styles.profile}>
      <img src={blankAvatar} alt="User avatar" className={styles.profile__avatar} />
      <span className={styles.profile__details}>
        <p>John Doe</p>
        <small>johndoe@gmail.com</small>
      </span>
    </div>
  );
};

export default Banner;
