import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Statistic from './index.jsx';

const sampleValue = 100;
const sampleUnit = 'kg';
const sampleTrend = 10;

describe('Statistic component', () => {
  test('renders value, unit, and trend correctly', () => {
    render(<Statistic value={sampleValue} unit={sampleUnit} trend={sampleTrend} />);

    expect(screen.getByText(`${sampleValue}${sampleUnit}`)).toBeInTheDocument();
    expect(screen.getByText(`${Math.abs(sampleTrend).toFixed(1)}%`)).toBeInTheDocument();
  });

  test('renders up arrow when trend is positive', () => {
    render(<Statistic value={sampleValue} unit={sampleUnit} trend={sampleTrend} />);

    expect(screen.getByTestId('up-arrow')).toBeInTheDocument();
  });

  test('renders down arrow when trend is negative', () => {
    render(<Statistic value={sampleValue} unit={sampleUnit} trend={-sampleTrend} />);

    expect(screen.getByTestId('down-arrow')).toBeInTheDocument();
  });
});
