import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarChart from './index.jsx';

describe('BarChart Component', () => {
  const mockData = [
    { xKey: 'Jan', yKey: 30 },
    { xKey: 'Feb', yKey: 20 },
    { xKey: 'Mar', yKey: 50 },
    { xKey: 'Apr', yKey: 40 },
  ];

  test('renders the BarChart component with bars', () => {
    render(<BarChart data={mockData} xKey="xKey" yKey="yKey" />);

    const bars = screen.getAllByTestId('barchart-bar');

    expect(bars).toHaveLength(mockData.length);
  });

  test('displays tooltip on bar hover', () => {
    render(<BarChart data={mockData} xKey="xKey" yKey="yKey" />);

    const bars = screen.getAllByTestId('barchart-bar');
    fireEvent.mouseMove(bars[0]);

    expect(screen.getByText((_, element) => element.textContent === 'xKey: Jan')).toBeInTheDocument();
    expect(screen.getByText((_, element) => element.textContent === 'yKey: 30')).toBeInTheDocument();
  });

  test('hides tooltip on mouse leave', () => {
    render(<BarChart data={mockData} xKey="xKey" yKey="yKey" />);

    const bars = screen.getAllByTestId('barchart-bar');
    fireEvent.mouseMove(bars[0]);
    fireEvent.mouseLeave(bars[0]);

    expect(screen.queryByText((_, element) => element.textContent === 'xKey: Jan')).not.toBeInTheDocument();
    expect(screen.queryByText((_, element) => element.textContent === 'yKey: 30')).not.toBeInTheDocument();
  });
});
