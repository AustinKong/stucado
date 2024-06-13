import { Widget } from '@components/widgets/Widget';
import './styles.css';
import { DaysOfWeek } from '@shared/constants';

const DUMMY_DATASET = [
  3, 5, 3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 3, 5, 3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 3, 5, 3, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 3, 5, 3, 7, 16, 3, 5, 3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30,
];

const HeatMap = () => {
  const max = Math.max(...DUMMY_DATASET);
  const data = DUMMY_DATASET.map((value) => Math.round((value / max) * 4));
  const dimensions = { rows: Math.ceil(data.length / 7), columns: 7 };

  return (
    <Widget className="heatmap" title={'Hours studied per day'}>
      <div className="heatmap__content">
        <div className="heatmap__days">
          {DaysOfWeek.map((day) => day.slice(0, 1)).map((day, index) => (
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
          {data.map((level, index) => (
            <HeatMapTile key={index} level={level} />
          ))}
        </div>
        <div className="heatmap__legend">
          Less
          <div className="heatmap__legend-container">
            {[0, 1, 2, 3, 4].map((level) => (
              <HeatMapTile key={level} level={level} />
            ))}
          </div>
          More
        </div>
      </div>
    </Widget>
  );
};

// Level 0 - 4
const HeatMapTile = ({ level }) => {
  return <div className={`heatmap-tile heatmap-tile--${level}`} />;
};

export default HeatMap;
