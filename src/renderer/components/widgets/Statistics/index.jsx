import { Widget, InteractionButton } from '@components/widgets/Widget';
import { ArrowsClockwise } from '@phosphor-icons/react';

import './styles.css';

const DUMMY_DATASET = [
  { key: '27 May', value: 10 },
  { key: '28 May', value: 15 },
  { key: '29 May', value: 23 },
  { key: '30 May', value: 25 },
  { key: '31 May', value: 36 },
  { key: '1 Jun', value: 35 },
  { key: '2 Jun', value: 3 },
];

const PX_PER_UNIT = 6;

const Statistics = () => {
  return (
    <Widget
      className="statistics"
      title={'Statistics (Hours studied per day)'}
      interaction={
        <InteractionButton icon={<ArrowsClockwise />} text="Last 7 days" onClick={() => console.log('click')} />
      }
    >
      <BarChart data={DUMMY_DATASET} ylim={{ min: 0, max: 50 }} yIncrement={5} />
    </Widget>
  );
};

/* 
Expect {
  data: [{ key: string, value: number }...],
  ylim: { min: number, max: number },
  yIncrement: number,
}
*/
const BarChart = ({ data, ylim, yIncrement }) => {
  const xRange = data.map((item) => item.key);
  const yRange = Array.from({ length: (ylim.max - ylim.min) / yIncrement + 1 }, (_, i) => ylim.min + i * yIncrement);

  return (
    <div className="bar-chart">
      <div className="bar-chart__y-axis">
        {yRange.map((value) => (
          <div key={value} className="bar-chart__y-label" style={{ height: yIncrement * PX_PER_UNIT }}>
            <span className="bar-chart__y-label-text">{value}</span>
          </div>
        ))}
      </div>
      <div className="bar-chart__bars">
        {data.map((item) => (
          <div key={item.key} className="bar-chart__bar-container">
            <span className="bar-chart__bar-label">{item.value}</span>
            <div className="bar-chart__bar" style={{ height: item.value * PX_PER_UNIT }} />
          </div>
        ))}
      </div>
      <div className="bar-chart__x-axis">
        {xRange.map((value) => (
          <div key={value} className="bar-chart__x-label">
            <span className="bar-chart__x-label-text">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
