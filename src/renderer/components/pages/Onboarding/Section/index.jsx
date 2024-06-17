import styles from './styles.module.css';

const Section = ({ title, description, children }) => {
  return (
    <div className={styles.onboarding}>
      <div className={styles.onboarding__content}>
        <h2 className={styles.onboarding__title}>{title}</h2>
        <p className={styles.onboarding__description}>{description}</p>
      </div>
      <div className={styles.onboarding__interaction}>{children}</div>
    </div>
  );
};

export default Section;
