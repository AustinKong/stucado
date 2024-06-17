import Widget from '@components/widgets/Widget';
import LineChart from '@components/generic/LineChart';
import styles from './styles.module.css';
import Card from '@components/widgets/statistics/Summary/Card';

const Summary = () => {
  return (
    <Widget title="Summary" className={styles.summary}>
      <div className={styles.summaryCards}>
        <Card title="Weight gained" value={1300} unit="kg" trend={5.2} />
        <Card title="Calories gained" value={1300} unit="kcal" trend={-2.3} />
        <Card title="Steps taken" value={500} unit="steps" trend={8.1} />
        <Card title="Water consumed" value={2000} unit="ml" trend={-1.2} />
      </div>

      <LineChart
        data={[
          { day: 0, calories: 500 },
          { day: 1, calories: 300 },
          { day: 2, calories: 1200 },
          { day: 3, calories: 500 },
          { day: 4, calories: 900 },
          { day: 5, calories: 700 },
          { day: 6, calories: 300 },
        ]}
        xKey="day"
        yKey="calories"
      />
    </Widget>
  );
};

export default Summary;
