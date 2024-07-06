import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Completion from './index.jsx';

describe('Completion Component', () => {
  const tasks = [
    { id: 1, status: 'Completed', estimatedTime: 2 },
    { id: 2, status: 'InProgress', estimatedTime: 3 },
    { id: 3, status: 'Pending', estimatedTime: 1 },
    { id: 4, status: 'Completed', estimatedTime: 4 },
  ];

  test('renders completion component with correct data', () => {
    render(<Completion tasks={tasks} />);

    // Header content check
    expect(screen.getByText(/2 of 4 tasks completed/i)).toBeInTheDocument();

    // Legend content check
    expect(screen.getAllByText(/Completed/i)).toHaveLength(2);
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();

    // Bars content check
    const bars = screen.getByTestId('completion-bars').children;
    expect(bars).toHaveLength(3);
  });

  test('calculates percentages correctly', () => {
    render(<Completion tasks={tasks} />);

    // Check if percentages are correctly calculated and displayed
    const completedPercentage = ((2 + 4) / (2 + 3 + 1 + 4)) * 100;
    const inProgressPercentage = (3 / (2 + 3 + 1 + 4)) * 100;
    const pendingPercentage = (1 / (2 + 3 + 1 + 4)) * 100;

    const completionBars = screen.getByTestId('completion-bars');

    for (let i = 0; i < completionBars.children.length; i++) {
      let passed = false;
      for (const bar of completionBars.children) {
        passed =
          passed ||
          bar.style.minWidth === `calc(${completedPercentage}%)` ||
          bar.style.minWidth === `calc(${inProgressPercentage}%)` ||
          bar.style.minWidth === `calc(${pendingPercentage}%)` ||
          bar.style.minWidth === 'calc(0%)';
      }
      expect(passed).toBe(true);
    }
  });

  test('renders empty bar when no tasks', () => {
    render(<Completion tasks={[]} />);

    expect(screen.getByText(/0 of 0 tasks completed/i)).toBeInTheDocument();
    const bars = screen.getByTestId('completion-bars').children;
    expect(bars).toHaveLength(1); // Empty bar
  });
});
