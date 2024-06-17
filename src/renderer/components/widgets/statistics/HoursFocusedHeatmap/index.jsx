import Heatmap from '@components/generic/Heatmap';
import Widget from '@components/widgets/Widget';
import styles from './styles.module.css';

const HoursFocusedHeatmap = () => {
  return (
    <Widget title="HoursFocused by day of week" className={styles.hoursFocusedHeatmap}>
      <div className={styles.hoursFocusedHeatmap__content}>
        <Heatmap
          data={[
            3, 5, 2, 1, 4, 3, 2, 4, 2, 1, 3, 2, 5, 4, 1, 3, 2, 4, 5, 3, 2, 2, 4, 5, 3, 2, 1, 4, 5, 2, 1, 4, 3, 2, 5, 3,
            1, 4, 2, 5, 3, 2, 3, 4, 1, 2, 3, 4, 5, 2, 3, 4, 2, 1, 3, 2, 4, 5, 3, 2, 4, 5, 3, 2, 1, 4, 5, 3, 2, 1, 4, 3, 2,
          ]}
        />
      </div>
    </Widget>
  );
};

export default HoursFocusedHeatmap;
