import Heatmap from '@components/generic/Heatmap';
import Widget from '@components/widgets/Widget';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { getHoursFocused } from '@services/statistics';

const HoursFocusedHeatmap = () => {
  const [hoursFocused, setHoursFocused] = useState([]);

  useEffect(() => {
    getHoursFocused(14).then((result) => {
      setHoursFocused(result.map((stat) => stat.hoursFocused));
    });
  }, []);

  return (
    <Widget title="Hours focused by day of week" className={styles.hoursFocusedHeatmap}>
      <div className={styles.hoursFocusedHeatmap__content}>
        <Heatmap data={hoursFocused} tooltip="Hours focused:" />
      </div>
    </Widget>
  );
};

export default HoursFocusedHeatmap;
