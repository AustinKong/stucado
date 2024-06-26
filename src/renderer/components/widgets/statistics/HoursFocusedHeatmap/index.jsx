import Heatmap from '@components/generic/Heatmap';
import Widget, { InteractionButton } from '@components/widgets/Widget';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { getHoursFocused } from '@services/statistics';
import { ArrowsClockwise } from '@phosphor-icons/react';

const HoursFocusedHeatmap = () => {
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
      title="Hours Focused"
      className={styles.hoursFocusedHeatmap}
      interaction={<InteractionButton icon={<ArrowsClockwise />} text={`Last ${range} days`} onClick={cycleRange} />}
    >
      <div className={styles.hoursFocusedHeatmap__content}>
        {hoursFocused && <Heatmap data={hoursFocused.map((stat) => stat['Hours focused'])} tooltip="Hours focused:" />}
      </div>
    </Widget>
  );
};

export default HoursFocusedHeatmap;
