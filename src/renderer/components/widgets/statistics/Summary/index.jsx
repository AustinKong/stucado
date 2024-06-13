import { Widget } from '@components/widgets/Widget';
import LineChart from '@components/generic/LineChart';
import { ArrowUpRight, ArrowDownRight } from '@phosphor-icons/react';
import './styles.css';

const Summary = () => {
  return (
    <Widget title="Summary" className="summary">
      <div className="summary-cards">
        <SummaryCard title="Weight gained" value={1300} unit="kg" trend={5.2} />
        <SummaryCard title="Calories gained" value={1300} unit="kcal" trend={-2.3} />
        <SummaryCard title="Steps taken" value={500} unit="steps" trend={8.1} />
        <SummaryCard title="Water consumed" value={2000} unit="ml" trend={-1.2} />
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

const SummaryCard = ({ title, value, unit, trend }) => {
  return (
    <div className="summary-card">
      <h3 className="summary-card__title">
        {value} &nbsp;
        {unit}
        <div>{title}</div>
      </h3>
      <div className="summary-card__subtitle">
        <div
          className={
            trend >= 0 ? 'summary-card__trend summary-card__trend--up' : 'summary-card__trend summary-card__trend--down'
          }
        >
          {trend >= 0 ? <ArrowUpRight size="16px" weight="bold" /> : <ArrowDownRight size="16px" weight="bold" />}
          {Math.abs(trend).toFixed(1)}%
        </div>
        vs. last 7 days
      </div>
    </div>
  );
};

export default Summary;
