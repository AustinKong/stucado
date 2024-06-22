import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HoursFocused, TasksCompleted, AverageProductivity } from './index.jsx';
import * as statisticsService from '@services/statistics';

jest.mock('@services/statistics');

describe('Tracking Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders HoursFocused component with enough data', async () => {
    statisticsService.getHoursFocused.mockResolvedValueOnce([
      { hoursFocused: 2 },
      { hoursFocused: 3 },
      { hoursFocused: 4 },
      { hoursFocused: 5 },
      { hoursFocused: 6 },
      { hoursFocused: 7 },
      { hoursFocused: 8 },
    ]);

    render(<HoursFocused />);

    expect(await screen.findByText('Hours Focused')).toBeInTheDocument();
    expect(screen.getByText('3 hrs')).toBeInTheDocument();
  });

  test('renders HoursFocused component with insufficient data', async () => {
    statisticsService.getHoursFocused.mockResolvedValueOnce([{ hoursFocused: 2 }, { hoursFocused: 3 }]);

    render(<HoursFocused />);

    expect(await screen.findByText('Hours Focused')).toBeInTheDocument();
    expect(screen.getByText('Trying to get more data...')).toBeInTheDocument();
  });

  test('renders TasksCompleted component with enough data', async () => {
    statisticsService.getTasksCompleted.mockResolvedValueOnce([
      { completedTasks: 1 },
      { completedTasks: 2 },
      { completedTasks: 3 },
      { completedTasks: 4 },
      { completedTasks: 5 },
      { completedTasks: 6 },
      { completedTasks: 7 },
    ]);

    render(<TasksCompleted />);

    expect(await screen.findByText('Tasks Completed')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  test('renders TasksCompleted component with insufficient data', async () => {
    statisticsService.getTasksCompleted.mockResolvedValueOnce([{ completedTasks: 1 }, { completedTasks: 2 }]);

    render(<TasksCompleted />);

    expect(await screen.findByText('Tasks Completed')).toBeInTheDocument();
    expect(screen.getByText('Trying to get more data...')).toBeInTheDocument();
  });

  test('renders AverageProductivity component with enough data', async () => {
    statisticsService.getAverageProductivity.mockResolvedValueOnce([
      { averageProductivity: 45 },
      { averageProductivity: 50 },
      { averageProductivity: 55 },
      { averageProductivity: 60 },
      { averageProductivity: 65 },
      { averageProductivity: 70 },
      { averageProductivity: 75 },
    ]);

    render(<AverageProductivity />);

    expect(await screen.findByText('Average Productivity')).toBeInTheDocument();
    expect(screen.getByText('55%')).toBeInTheDocument();
  });

  test('renders AverageProductivity component with insufficient data', async () => {
    statisticsService.getAverageProductivity.mockResolvedValueOnce([
      { averageProductivity: 45 },
      { averageProductivity: 50 },
    ]);

    render(<AverageProductivity />);

    expect(await screen.findByText('Average Productivity')).toBeInTheDocument();
    expect(screen.getByText('Trying to get more data...')).toBeInTheDocument();
  });
});
