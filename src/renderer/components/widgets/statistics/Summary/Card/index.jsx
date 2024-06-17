import styles from './styles.module.css';
import { ArrowUpRight, ArrowDownRight } from '@phosphor-icons/react';

const Card = ({ title, value, unit, trend }) => {
  return (
    <div className={styles.card}>
      <h3>
        {value} &nbsp;
        {unit}
        <div>{title}</div>
      </h3>
      <div className={styles.card__subtitle}>
        <div className={`${styles.card__trend} ${trend >= 0 ? styles.card__trendUp : styles.card__trendDown}`}>
          {trend >= 0 ? <ArrowUpRight size="16px" weight="bold" /> : <ArrowDownRight size="16px" weight="bold" />}
          {Math.abs(trend).toFixed(1)}%
        </div>
        vs. last 7 days
      </div>
    </div>
  );
};

export default Card;
