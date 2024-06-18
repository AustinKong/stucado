import { ArrowsClockwise } from '@phosphor-icons/react';

import Widget, { InteractionButton } from '@components/widgets/Widget';
import LineChart from '@components/generic/LineChart';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { getHoursFocused } from '@services/statistics';

const HoursFocusedLineChart = () => {
  const [hoursFocused, setHoursFocused] = useState(null);
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
    getHoursFocused(range).then((result) => {
      setHoursFocused(
        result.map((stat) => {
          return {
            Date: stat.date.toLocaleDateString('en-US'),
            'Hours focused': Math.round(stat.hoursFocused),
          };
        })
      );
    });
  }, [range]);

  return (
    <Widget
      className={styles.hoursFocusedLineChart}
      title={'Hours Focused'}
      interaction={<InteractionButton icon={<ArrowsClockwise />} text={`Last ${range} days`} onClick={cycleRange} />}
    >
      {hoursFocused && <LineChart data={hoursFocused} xKey="Date" yKey="Hours focused" yUnits=" hrs" />}
    </Widget>
  );
};

export default HoursFocusedLineChart;
