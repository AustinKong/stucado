import { ArrowsClockwise } from '@phosphor-icons/react';

import Widget, { InteractionButton } from '@components/widgets/Widget';
import LineChart from '@components/generic/LineChart';
import styles from './styles.module.css';

const DUMMY_DATASET = [
  { 'Days before': 'Monday', Productivity: 10 },
  { 'Days before': 13, Productivity: 15 },
  { 'Days before': 'spaghtetti day', Productivity: 23 },
  { 'Days before': 11, Productivity: 25 },
  { 'Days before': 10, Productivity: 100 },
  { 'Days before': 9, Productivity: 35 },
  { 'Days before': 8, Productivity: 3 },
  { 'Days before': 7, Productivity: 10 },
  { 'Days before': 6, Productivity: 15 },
  { 'Days before': 5, Productivity: 23 },
  { 'Days before': 4, Productivity: 25 },
  { 'Days before': 3, Productivity: 100 },
  { 'Days before': 2, Productivity: 35 },
  { 'Days before': 1, Productivity: 3 },
];

const PastProductivityLineChart = () => {
  return (
    <Widget
      className={styles.pastProductivityLineChart}
      title={'Past Productivity'}
      interaction={
        <InteractionButton icon={<ArrowsClockwise />} text="Last 14 days" onClick={() => console.log('click')} />
      }
    >
      <LineChart data={DUMMY_DATASET} xKey="Days before" yKey="Productivity" />
    </Widget>
  );
};

export default PastProductivityLineChart;
