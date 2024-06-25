import styles from './styles.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}>
        <span />
      </div>
    </div>
  );
};

export default Loading;
