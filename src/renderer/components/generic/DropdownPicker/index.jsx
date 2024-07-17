import { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

const DropdownPicker = ({ options, onSelect, label, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options.find((option) => option.value === value));
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownPicker} ref={dropdownRef}>
      {label && <label className={styles.dropdownLabel}>{label}</label>}
      <div className={styles.dropdownHeader} onClick={() => setIsOpen(!isOpen)} data-testid="dropdown">
        {selectedOption ? selectedOption.label : 'Select an option'}
        <span className={styles.dropdownArrow}>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className={styles.dropdownList}>
          {options.map((option) => (
            <div key={option.value} className={styles.dropdownOption} onClick={() => handleOptionClick(option)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownPicker;
