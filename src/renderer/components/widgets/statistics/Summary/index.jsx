import Widget from '@components/widgets/Widget';
import LineChart from '@components/generic/LineChart';
import styles from './styles.module.css';
import Card from '@components/widgets/statistics/Summary/Card';
import { useState } from 'react';

const Summary = () => {
  const [selected, setSelected] = useState('hours Focused');

  return (
    <Widget title="Summary" className={styles.summary}>
      <div className={styles.summaryCards}>
        <Card title="Hours Focused" value={1300} unit=" hours" trend={5.2} />
        <Card title="Tasks Completed" value={1300} unit=" tasks" trend={-2.3} />
        <Card title="Average Productivity" value={500} unit="%" trend={8.1} />
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
