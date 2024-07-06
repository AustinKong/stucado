import { render, screen, fireEvent } from '@testing-library/react';
import AddTaskModal from './index.jsx';
import { createTask } from '@services/tasks';
import '@testing-library/jest-dom';

jest.mock('@services/tasks', () => ({
  createTask: jest.fn(),
}));

describe('AddTaskModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    document.body.innerHTML = '<div id="portal"></div>';
    mockOnClose.mockClear();
    createTask.mockClear();
  });

  test('renders modal with default state', () => {
    render(<AddTaskModal onClose={mockOnClose} />);

    expect(screen.getByText(/Add task/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter task title/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/Enter task description/i)).toHaveValue('');
  });

  test('handles input changes', () => {
    render(<AddTaskModal onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter task title/i), {
      target: { value: 'Test Task', name: 'title' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter task description/i), {
      target: { value: 'Test Description', name: 'description' },
    });

    expect(screen.getByPlaceholderText(/Enter task title/i)).toHaveValue('Test Task');
    expect(screen.getByPlaceholderText(/Enter task description/i)).toHaveValue('Test Description');
  });

  test('submits the form and calls createTask', () => {
    render(<AddTaskModal onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter task title/i), {
      target: { value: 'Test Task', name: 'title' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter task description/i), {
      target: { value: 'Test Description', name: 'description' },
    });
    fireEvent.change(screen.getByLabelText(/Estimated time/i), { target: { value: '60', name: 'estimatedTime' } });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(createTask).toHaveBeenCalledWith('Test Task', 'Test Description', '60');
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('cancels the form and resets state', () => {
    render(<AddTaskModal onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter task title/i), {
      target: { value: 'Test Task', name: 'title' },
    });

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(screen.getByPlaceholderText(/Enter task title/i)).toHaveValue('');
    expect(mockOnClose).toHaveBeenCalled();
  });
});
