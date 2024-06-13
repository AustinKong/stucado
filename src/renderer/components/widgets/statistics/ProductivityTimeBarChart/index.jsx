import BarChart from '@components/generic/BarChart';

const ProductivityTimeBarChart = ({ data }) => {
  return (
    <BarChart
      data={data}
      xKey="Time of day"
      yKey="Productivity"
    />
  );
};

export default ProductivityTimeBarChart;
