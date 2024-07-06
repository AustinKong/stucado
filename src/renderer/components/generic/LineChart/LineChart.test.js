import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LineChart from './index.jsx';

jest.mock('@phosphor-icons/react', () => {
  return {
    Warning: () => <span>Warning Icon</span>,
  };
});

describe('LineChart Component', () => {
  const mockData = [
    { date: '2021-01-01', value: 10 },
    { date: '2021-01-02', value: 20 },
    { date: '2021-01-03', value: 30 },
  ];

  test('renders correctly with data', () => {
    const { container } = render(<LineChart data={mockData} xKey="date" yKey="value" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders warning when there is no data', () => {
    const { getByText } = render(<LineChart data={[]} xKey="date" yKey="value" />);
    expect(getByText('Warning Icon')).toBeInTheDocument();
    expect(getByText('No data to render')).toBeInTheDocument();
  });

  test('renders X axis labels correctly', () => {
    const { getByText } = render(<LineChart data={mockData} xKey="date" yKey="value" labels={mockData.length} />);
    mockData.forEach((d) => {
      expect(getByText(d.date)).toBeInTheDocument();
    });
  });

  test('displays tooltip on mouse move', () => {
    const { container, getByTestId } = render(<LineChart data={mockData} xKey="date" yKey="value" />);
    const svg = container.querySelector('svg');

    fireEvent.mouseMove(svg, { clientX: 100, clientY: 100 });

    const tooltip = getByTestId('tooltip');
    expect(tooltip).toBeInTheDocument();

    const tooltipDate = getByTestId('tooltipKey');
    const tooltipValue = getByTestId('tooltipValue');

    expect(tooltipDate).toBeInTheDocument();
    expect(tooltipValue).toBeInTheDocument();
  });

  test('hides tooltip on mouse leave', () => {
    const { container, queryByTestId } = render(<LineChart data={mockData} xKey="date" yKey="value" />);
    const svg = container.querySelector('svg');

    fireEvent.mouseMove(svg, { clientX: 100, clientY: 100 });
    fireEvent.mouseLeave(svg);

    const tooltip = queryByTestId('tooltip');
    expect(tooltip).not.toBeInTheDocument();
  });

  test('handles window resize correctly', () => {
    const { container } = render(<LineChart data={mockData} xKey="date" yKey="value" />);
    const svg = container.querySelector('svg');

    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    expect(svg).toBeInTheDocument();
  });
});
