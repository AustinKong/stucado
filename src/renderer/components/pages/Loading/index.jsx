import styles from './styles.module.css';
import { Avocado } from '@phosphor-icons/react';

const Loading = () => {
  return (
    <div className={styles.loading} data-testid="loading">
      <Avocado size={64} />
      <div className={styles.spinner}>
        <span />
      </div>
    </div>
  );
};

export default Loading;
