import styles from './styles.module.css';

/**
 * Input component for rendering an input field with optional label, placeholder, icon, and other props.
 *
 * @component
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.value - The value of the input field.
 * @param {function} props.onChange - The event handler for input field changes.
 * @param {string} [props.type='text'] - The type of the input field.
 * @param {ReactNode} [props.icon] - The icon to be displayed alongside the input field.
 * @param {boolean} [props.required=false] - Indicates whether the input field is required.
 * @param {Object} [props] - Additional props to be spread on the input element.
 * @returns {JSX.Element} The rendered Input component.
 */
const Input = ({ label, placeholder, value, onChange, onBlur, type = 'text', icon, required = false, ...props }) => {
  return (
    <div className={styles.input}>
      {label && (
        <label className={styles.input__label} htmlFor="input">
          {label}
          {required && <span className={styles.input__requiredStar}>*</span>}
        </label>
      )}
      <div className={styles.input__wrapper}>
        {icon && <div className={styles.input__icon}>{icon}</div>}
        <input
          id="input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={styles.input__input}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
