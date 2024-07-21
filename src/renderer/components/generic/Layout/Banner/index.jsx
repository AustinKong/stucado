import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
/*
import { MagnifyingGlass } from '@phosphor-icons/react';
import Input from '@components/generic/Input';
*/
import studiousAvocado from '@assets/images/pfp1.jpg';
import playfulAvocado from '@assets/images/pfp2.jpg';
import chillAvocado from '@assets/images/pfp3.jpg';

const Banner = () => {
  // Gets location name based on React Router path
  const location = useLocation();
  // Capitalization done in CSS
  const locationName = location.pathname.replace('/', '') || 'dashboard';

  return (
    <div className={styles.banner}>
      <h3 className={styles.banner__title}>{locationName}</h3>
      {/*
      <div style={{ width: '240px' }}>
        <Input icon={<MagnifyingGlass />} placeholder="Search or type a command" />
      </div>
        */}
      <UserProfile />
    </div>
  );
};

const UserProfile = () => {
  const settings = useSelector((state) => state.settings);

  return (
    <div className={styles.profile}>
      <img
        alt="User avatar"
        className={styles.profile__avatar}
        src={
          settings.profilePicture === 'playful'
            ? playfulAvocado
            : settings.profilePicture === 'chill'
              ? chillAvocado
              : studiousAvocado
        }
      />
      <span className={styles.profile__details}>
        <p>{settings.username}</p>
        <small>{settings.status}</small>
      </span>
    </div>
  );
};

export default Banner;
