import styles from './styles.module.css';

/**
 * Custom text area component, used for long form inputs.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the textarea.
 * @param {string} props.placeholder - The placeholder text for the textarea.
 * @param {string} props.value - The value of the textarea.
 * @param {function} props.onChange - The event handler for the onChange event.
 * @param {function} props.onBlur - The event handler for the onBlur event.
 * @param {boolean} [props.required=false] - Indicates if the textarea is required.
 * @returns {JSX.Element} The rendered TextArea component.
 */
const TextArea = ({ label, placeholder, value, onChange, onBlur, required = false, ...props }) => {
  return (
    <div className={styles.textArea}>
      {label && (
        <label className={styles.textArea__label}>
          {label}
          {required && <span className={styles.textArea__requiredStar}>*</span>}
        </label>
      )}
      <div className={styles.textArea__wrapper}>
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={styles.textArea__input}
          {...props}
        />
      </div>
    </div>
  );
};

export default TextArea;
