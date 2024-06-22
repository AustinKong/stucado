import { render, screen } from '@testing-library/react';
import Histogram from './index.jsx';
import '@testing-library/jest-dom';

const sampleData = [10, 20, 30, 40, 50];

describe('Histogram component', () => {
  test('renders bars with correct heights and widths', () => {
    render(<Histogram data={sampleData} />);

    const bars = screen.getAllByTestId('histogram-bar');
    expect(bars.length).toBe(sampleData.length);

    const max = Math.max(...sampleData);
    bars.forEach((bar, index) => {
      const height = (sampleData[index] / max) * 100;
      const width = 100 / sampleData.length;
      expect(bar).toHaveStyle(`height: ${height}%`);
      expect(bar).toHaveStyle(`width: ${width}%`);
    });
  });

  test('renders no bars when data is empty', () => {
    render(<Histogram data={[]} />);

    const bars = screen.queryAllByTestId('histogram-bar');
    expect(bars.length).toBe(0);
  });
});
