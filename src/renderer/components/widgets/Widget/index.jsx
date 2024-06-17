import { IconContext } from '@phosphor-icons/react';
import styles from './styles.module.css';

const Widget = ({ className, title, interaction, children }) => {
  return (
    <div className={`${styles.widget} ${className}`}>
      {(title || interaction) && (
        <div className={styles.widget__header}>
          <h4>{title}</h4>
          <>{interaction}</>
        </div>
      )}
      <div className={styles.widget__content}>{children}</div>
    </div>
  );
};

export const InteractionButton = ({ icon, text, onClick }) => {
  return (
    <button className={styles.widgetInteraction} onClick={onClick}>
      <IconContext.Provider
        value={{
          size: 20,
        }}
      >
        {icon}
      </IconContext.Provider>
      <p>{text}</p>
    </button>
  );
};

export default Widget;
