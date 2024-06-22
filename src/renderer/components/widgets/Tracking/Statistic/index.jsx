import { ArrowUpRight, ArrowDownRight } from '@phosphor-icons/react';
import styles from './styles.module.css';

const Statistic = ({ value, unit, trend }) => {
  return (
    <div className={styles.statistic}>
      <h1>
        {value}
        {unit}
      </h1>
      <div className={styles.statistic__subtitle}>
        <div
          className={`${styles.statistic__trend} ${trend >= 0 ? styles.statistic__trendUp : styles.statistic__trendDown}`}
        >
          {trend >= 0 ? <ArrowUpRight size="16px" weight="bold" data-testid="up-arrow" /> : <ArrowDownRight size="16px" weight="bold" data-testid="down-arrow" />}
        </div>
        {Math.abs(trend).toFixed(1)}%
      </div>
    </div>
  );
};

export default Statistic;
