import './styles.css';
import { DaysOfWeek } from '@shared/constants';

const HeatMap = ({ data = [], daysOfWeek = DaysOfWeek, levels = 4, columns = 7, tooltip = 'key:' }) => {
  const max = Math.max(...data);
  const normalizedData = data.map((value) => Math.round((value / max) * levels));

  const dimensions = {
    rows: Math.ceil(normalizedData.length / columns),
    columns: columns,
  };

  return (
    <div className="heatmap">
      <div className="heatmap__days">
        {daysOfWeek
          .map((day) => day.slice(0, 1))
          .map((day, index) => (
            <span key={index} className="heatmap__day">
              {day}
            </span>
          ))}
      </div>
      <div
        className="heatmap__container"
        style={{
          gridTemplateColumns: `repeat(${dimensions.columns}, 1fr)`,
          gridTemplateRows: `repeat(${dimensions.rows}, 1fr)`,
        }}
      >
        {normalizedData.map((level, index) => (
          <HeatMapTile key={index} level={level} tooltip={`${tooltip} ${data[index]}`} />
        ))}
      </div>
      <div className="heatmap__legend">
        Less
        <div className="heatmap__legend-container">
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
  return (
    <div className={`heatmap-tile heatmap-tile--${level}`}>
      {tooltip && <div className="heatmap-tile__tooltip">{tooltip}</div>}
    </div>
  );
};

export default HeatMap;
