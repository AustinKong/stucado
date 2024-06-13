import './styles.css';
import Summary from '@components/widgets/statistics/Summary';
import HoursFocusedHeatmap from '@components/widgets/statistics/HoursFocusedHeatmap';

const Statistics = () => {
  return (
    <div className="statistics-page">
      <Summary />
      <HoursFocusedHeatmap />
    </div>
  );
};

export default Statistics;
