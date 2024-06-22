import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from './index.jsx';
import styles from './styles.modules.css';

describe('Calendar Component', () => {
  const mockDate = new Date(2023, 5, 15); // Mocking a specific date: June 15, 2023

  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(mockDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('renders the calendar header with current month and year', () => {
    render(<Calendar />);
    const header = screen.getByText(/June 2023/i);
    expect(header).toBeInTheDocument();
  });

  test('renders the days of the week', () => {
    render(<Calendar />);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach((day) => {
      const dayElement = screen.getByText(day);
      expect(dayElement).toBeInTheDocument();
    });
  });

  test('renders the correct number of days in the month', () => {
    render(<Calendar />);
    const daysInMonth = 30; // June has 30 days
    const dayElements = screen
      .getAllByText(/\d+/)
      .filter(
        (element) => !['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'June 2023'].includes(element.textContent)
      );
    expect(dayElements).toHaveLength(daysInMonth);
  });

  test('highlights the current day', () => {
    render(<Calendar />);
    const currentDayElement = screen.getByText(mockDate.getDate().toString());
    expect(currentDayElement).toHaveClass(`${styles.calendar__dayActive}`);
  });

  test('renders the correct number of empty days at the start of the month', () => {
    render(<Calendar />);
    const firstDayOfMonth = new Date(mockDate.getFullYear(), mockDate.getMonth(), 1).getDay();
    const emptyDayElements = screen.getAllByTestId('empty-day');
    expect(emptyDayElements).toHaveLength(firstDayOfMonth);
  });
});
