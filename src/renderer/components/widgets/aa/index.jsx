import { Widget, InteractionButton } from '@components/widgets/Widget';
import { ArrowsClockwise } from '@phosphor-icons/react';

import BarChart from '@components/generic/BarChart';
import LineChart from '@components/generic/LineChart';
import './styles.css';

const DUMMY_DATASET = [
  { key: '27 May', value: 10 },
  { key: '28 May', value: 15 },
  { key: '29 May', value: 23 },
  { key: '30 May', value: 25 },
  { key: '31 May', value: 100 },
  { key: '1 Jun', value: 35 },
  { key: '2 Jun', value: 3 },
];

const Statistics = () => {
  return (
    <Widget
      className="statistics"
      title={'Statistics (Hours studied per day)'}
      interaction={
        <InteractionButton icon={<ArrowsClockwise />} text="Last 7 days" onClick={() => console.log('click')} />
      }
    >
      <BarChart data={DUMMY_DATASET} xKey="key" yKey="value" />
    </Widget>
  );
};

export default Statistics;
