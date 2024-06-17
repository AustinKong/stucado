import { IconContext, CheckSquare, GridFour, Student } from '@phosphor-icons/react';
import styles from './styles.module.css';

const SCHEDULE_FILTERS = [
  { label: 'All scheduled', icon: <GridFour />, value: 'all' },
  { label: 'Tasks', icon: <CheckSquare />, value: 'tasks' },
  { label: 'Classes', icon: <Student />, value: 'classes' },
];

const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <div className={styles.filter}>
      {SCHEDULE_FILTERS.map((f) => {
        return (
          <div
            className={`${styles.filter__tab} ${filter === f.value ? styles.filter__tabActive : ''}`}
            onClick={() => handleFilterChange(f.value)}
            key={f.value}
          >
            <IconContext.Provider value={{ size: '24px' }}>{f.icon}</IconContext.Provider>
            {f.label}
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
