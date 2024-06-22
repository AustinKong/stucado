import { Barricade } from '@phosphor-icons/react';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';

const Construction = () => {
  return (
    <div className={styles.construction}>
      <div className={styles.construction__icon} data-testid="barricade-icon">
        <Barricade size={48} />
      </div>
      <h3 className={styles.construction__text}>
        Hello fellow tester/developer! <br /> This feature is under construction, please wait for it to be updated!
      </h3>
      <NavLink to="/" className={styles.construction__link}>
        Return to Home
      </NavLink>
    </div>
  );
};

export default Construction;
