import styles from './styles.module.css';

const Histogram = ({ data }) => {
  const max = Math.max(...data);

  return (
    <div className={styles.histogram}>
      {data.map((value, index) => (
        <div
          key={index}
          className={styles.histogram__bar}
          style={{ height: `${(value / max) * 100}%`, width: `${100 / data.length}%` }}
        />
      ))}
    </div>
  );
};

export default Histogram;
