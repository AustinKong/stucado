import { ArrowsClockwise } from '@phosphor-icons/react';

import Widget, { InteractionButton } from '@components/widgets/Widget';
import LineChart from '@components/generic/LineChart';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { getAverageProductivity } from '@services/statistics';

const PastProductivityLineChart = () => {
  const [pastProductivity, setPastProductivity] = useState(null);
  const [range, setRange] = useState(14);

  const cycleRange = () => {
    if (range === 14) {
      setRange(30);
    } else if (range === 30) {
      setRange(7);
    } else {
      setRange(14);
    }
  };

  useEffect(() => {
    getAverageProductivity(range).then((result) => {
      setPastProductivity(
        result.map((stat) => {
          return {
            Date: stat.date.toLocaleDateString('en-US'),
            Productivity: Math.round(stat.averageProductivity),
          };
        })
      );
    });
  }, [range]);

  return (
    <Widget
      className={styles.pastProductivityLineChart}
      title={'Past Productivity'}
      interaction={<InteractionButton icon={<ArrowsClockwise />} text={`Last ${range} days`} onClick={cycleRange} />}
    >
      {pastProductivity && <LineChart data={pastProductivity} xKey="Date" yKey="Productivity" yUnits="%" />}
    </Widget>
  );
};

export default PastProductivityLineChart;
