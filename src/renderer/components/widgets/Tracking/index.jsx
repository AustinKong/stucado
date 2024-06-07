import { DotsThreeVertical, ArrowUpRight, ArrowDownRight } from '@phosphor-icons/react';
import { Widget, InteractionButton } from '@components/widgets/Widget';

import './styles.css';

const Tracking = ({ title, unit, pastData, currentData }) => {
  // Choose to display upwards trend or downwards trend UI based on this
  const changePercentage = ((currentData - pastData[pastData.length - 1]) / pastData[pastData.length - 1]) * 100;

  return (
    <Widget
      className="tracking"
      title={title}
      interaction={<InteractionButton icon={<DotsThreeVertical />} onClick={() => console.log('Edit')} />}
    >
      <div className="tracking__content">
        <TrackingHistogram data={pastData.concat(currentData)} />
        <TrackingStatistic value={currentData} unit={unit} trend={changePercentage} />
      </div>
    </Widget>
  );
};

const TrackingStatistic = ({ value, unit, trend }) => {
  return (
    <div className="tracking-statistic">
      <h3 className="tracking-statistic__title">
        {value}
        {unit}
      </h3>
      <div className="tracking-statistic__subtitle">
        <div
          className={
            trend >= 0
              ? 'tracking-statistic__trend tracking-statistic__trend--up'
              : 'tracking-statistic__trend tracking-statistic__trend--down'
          }
        >
          {trend >= 0 ? <ArrowUpRight size="16px" weight="bold" /> : <ArrowDownRight size="16px" weight="bold" />}
        </div>
        {Math.abs(trend).toFixed(1)}%
      </div>
    </div>
  );
};

const TrackingHistogram = ({ data }) => {
  const max = Math.max(...data);

  return (
    <div className="tracking-histogram">
      {data.map((value, index) => (
        <div
          key={index}
          className="tracking-histogram__bar"
          style={{ height: `${(value / max) * 100}%`, width: `${100 / data.length}%` }}
        />
      ))}
    </div>
  );
};

export const HoursFocused = () => {
  return <Tracking title="Hours Focused" unit=" hrs" pastData={[4, 5, 2, 3, 6, 3, 10]} currentData={3} />;
};

export const TasksCompleted = () => {
  return <Tracking title="Tasks Completed" pastData={[3, 32, 93, 12, 11, 94, 83]} currentData={88} />;
};

export const AverageProductivity = () => {
  return <Tracking title="Average Productivity" unit="%" pastData={[3, 32, 93, 12, 11, 94, 83]} currentData={55} />;
};
