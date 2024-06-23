import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSelector } from 'react-redux';
import { Tracking, HoursFocused, TasksCompleted, AverageProductivity } from './index.jsx';
import * as statisticsService from '@services/statistics';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('@services/statistics', () => ({
  getHoursFocused: jest.fn(),
  getCurrentHoursFocused: jest.fn(),
  getTasksCompleted: jest.fn(),
  getCurrentTasksCompleted: jest.fn(),
  getAverageProductivity: jest.fn(),
  getCurrentAverageProductivity: jest.fn(),
}));

describe('Tracking Components', () => {
  beforeEach(() => {
    useSelector.mockClear();
    statisticsService.getHoursFocused.mockClear();
    statisticsService.getCurrentHoursFocused.mockClear();
    statisticsService.getTasksCompleted.mockClear();
    statisticsService.getCurrentTasksCompleted.mockClear();
    statisticsService.getAverageProductivity.mockClear();
    statisticsService.getCurrentAverageProductivity.mockClear();
  });

  const mockState = {
    tasks: [],
  };

  useSelector.mockImplementation((callback) => {
    return callback(mockState);
  });

  test('renders HoursFocused component correctly', async () => {
    statisticsService.getHoursFocused.mockResolvedValue([{ hoursFocused: 2 }]);
    statisticsService.getCurrentHoursFocused.mockResolvedValue(3);

    render(<HoursFocused />);
    expect(await screen.findByText('Hours Focused')).toBeInTheDocument();
  });

  test('renders TasksCompleted component correctly', async () => {
    statisticsService.getTasksCompleted.mockResolvedValue([{ completedTasks: 5 }]);
    statisticsService.getCurrentTasksCompleted.mockResolvedValue(6);

    render(<TasksCompleted />);
    expect(await screen.findByText('Tasks Completed')).toBeInTheDocument();
  });

  test('renders AverageProductivity component correctly', async () => {
    statisticsService.getAverageProductivity.mockResolvedValue([{ averageProductivity: 70 }]);
    statisticsService.getCurrentAverageProductivity.mockResolvedValue(75);

    render(<AverageProductivity />);
    expect(await screen.findByText('Average Productivity')).toBeInTheDocument();
  });

  test('displays loading message if not enough data', () => {
    render(<Tracking title="Test Title" unit="%" pastData={[]} currentData={null} />);
    expect(screen.getByText(/Not enough data collected/i)).toBeInTheDocument();
  });

  test('displays Histogram and Statistic if enough data', () => {
    render(<Tracking title="Test Title" unit="%" pastData={[1, 2, 3]} currentData={4} />);
    expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
    expect(screen.getByText(/4/i)).toBeInTheDocument();
  });
});
