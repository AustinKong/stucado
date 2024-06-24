import styles from './styles.module.css';
import { Avocado } from '@phosphor-icons/react';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Avocado size={48}/>
      <h1>Loading</h1>
    </div>
  );
};

export default Loading;
