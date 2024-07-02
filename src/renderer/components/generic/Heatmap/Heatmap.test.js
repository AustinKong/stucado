import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeatMap from '../HeatMap';
import { DaysOfWeek } from '@shared/constants';

jest.mock('@phosphor-icons/react', () => {
  return {
    Warning: () => <span>Warning Icon</span>,
  };
});

describe('Heatmap Component', () => {
  test('renders correctly with default props', () => {
    const { getByText, getAllByText } = render(<HeatMap data={[1, 2, 3, 4, 5, 6, 7]} />);

    DaysOfWeek.forEach((day) => {
      const days = getAllByText(day.slice(0, 1));
      expect(days.length).toBeGreaterThanOrEqual(1);
    });

    expect(getByText((_, element) => element.textContent === 'Less')).toBeInTheDocument();
    expect(getByText((_, element) => element.textContent === 'More')).toBeInTheDocument();
  });

  test('renders warning when there is no data', () => {
    const { getByText } = render(<HeatMap data={[]} />);

    expect(getByText('Warning Icon')).toBeInTheDocument();
    expect(getByText('No data to render')).toBeInTheDocument();
  });

  test('renders the correct number of heatmap tiles', () => {
    const { getAllByTestId } = render(<HeatMap data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />);

    const tiles = getAllByTestId('heatmapTile');
    expect(tiles.length).toBe(10);
  });

  test('renders tiles with correct tooltip', () => {
    const data = [1, 2, 3, 4];
    const { getByText } = render(<HeatMap data={data} tooltip="value:" />);

    data.forEach((value) => {
      expect(getByText(`value: ${value}`)).toBeInTheDocument();
    });
  });

  test('renders correct number of legend tiles', () => {
    const { getAllByTestId } = render(<HeatMap data={[1, 2, 3, 4, 5, 6, 7]} levels={4} />);

    const legendTiles = getAllByTestId('legendTile');
    expect(legendTiles.length).toBe(5);
  });

  test('renders correct number of days of the week', () => {
    const { getAllByText } = render(<HeatMap data={[1, 2, 3, 4, 5, 6, 7]} daysOfWeek={DaysOfWeek} />);

    DaysOfWeek.forEach((day) => {
      const days = getAllByText(day.slice(0, 1));
      expect(days.length).toBeGreaterThanOrEqual(1);
    });
  });
});
