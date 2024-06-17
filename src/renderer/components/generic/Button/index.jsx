import styles from './styles.module.css';

const Button = ({ onClick, appearance, children, className, ...props }) => {
  switch (appearance) {
    case 'warn':
      return (
        <button className={`${styles.button} ${styles.buttonWarn} ${className}`} onClick={onClick} {...props}>
          {children}
        </button>
      );
    case 'danger':
      return (
        <button className={`${styles.button} ${styles.buttonDanger} ${className}`} onClick={onClick} {...props}>
          {children}
        </button>
      );
    case 'secondary':
      return (
        <button className={`${styles.button} ${styles.buttonSecondary} ${className}`} onClick={onClick} {...props}>
          {children}
        </button>
      );
    default:
      return (
        <button className={`${styles.button} ${className}`} onClick={onClick} {...props}>
          {children}
        </button>
      );
  }
};

export default Button;
