import styles from './styles.module.css';
import { DaysOfWeek } from '@shared/constants';
import { Warning } from '@phosphor-icons/react';

const HeatMap = ({ data = [], daysOfWeek = DaysOfWeek, levels = 4, columns = 7, tooltip = 'key:' }) => {
  const max = Math.max(...data);
  const normalizedData = data.map((value) => Math.round((value / max) * levels));

  const dimensions = {
    rows: Math.ceil(normalizedData.length / columns),
    columns: columns,
  };

  if (normalizedData.length == 0) {
    return (
      <div className={styles.error}>
        <Warning size={24} /> &nbsp;No data to render
      </div>
    );
  }

  return (
    <div className={styles.heatmap}>
      <div className={styles.heatmap__days}>
        {daysOfWeek
          .map((day) => day.slice(0, 1))
          .map((day, index) => (
            <span key={index} className={styles.heatmap__day}>
              {day}
            </span>
          ))}
      </div>
      <div
        className={styles.heatmap__container}
        style={{
          gridTemplateColumns: `repeat(${dimensions.columns}, 1fr)`,
          gridTemplateRows: `repeat(${dimensions.rows}, 1fr)`,
        }}
      >
        {normalizedData.map((level, index) => (
          <HeatMapTile key={index} level={level} tooltip={`${tooltip} ${Math.round(data[index])}`} />
        ))}
      </div>
      <div className={styles.heatmap__legend}>
        Less
        <div className={styles.heatmap__legendContainer}>
          {[...Array(levels + 1).keys()].map((level) => (
            <HeatMapTile key={level} level={level} tooltip={null} />
          ))}
        </div>
        More
      </div>
    </div>
  );
};

const HeatMapTile = ({ level, tooltip }) => {
  const LEVEL_COLORS = [
    '#EFFFD6',
    '#D3F1A7',
    '#B3DF72',
    '#94C748',
    '#82B536',
    '#6A9A23',
    '#5B7F24',
    '#4C6B1F',
    '#37471F',
  ];

  return (
    <div className={styles.heatmapTile} style={{ backgroundColor: LEVEL_COLORS[level] }}>
      {tooltip && <div className={styles.heatmapTile__tooltip}>{tooltip}</div>}
    </div>
  );
};

export default HeatMap;
