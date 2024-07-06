import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditTaskModal from './index.jsx';
import { editTask, deleteTask } from '@services/tasks';

jest.mock('@services/tasks', () => ({
  editTask: jest.fn(),
  deleteTask: jest.fn(),
}));

describe('EditTaskModal Component', () => {
  const task = {
    id: 1,
    title: 'Sample Task',
    description: 'Sample Description',
    estimatedTime: 60,
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    editTask.mockClear();
    deleteTask.mockClear();
    document.body.innerHTML = '<div id="portal"></div>';
  });

  test('renders modal with default task data', () => {
    render(<EditTaskModal task={task} onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText(/Enter task title/i)).toHaveValue('Sample Task');
    expect(screen.getByPlaceholderText(/Enter task description/i)).toHaveValue('Sample Description');
    expect(screen.getByPlaceholderText(/HH:MM/i)).toHaveValue('01:00');
  });

  test('handles input changes', () => {
    render(<EditTaskModal task={task} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter task title/i), {
      target: { value: 'Updated Task', name: 'title' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter task description/i), {
      target: { value: 'Updated Description', name: 'description' },
    });
    fireEvent.change(screen.getByPlaceholderText(/HH:MM/i), { target: { value: '120', name: 'estimatedTime' } });

    expect(screen.getByPlaceholderText(/Enter task title/i)).toHaveValue('Updated Task');
    expect(screen.getByPlaceholderText(/Enter task description/i)).toHaveValue('Updated Description');
    expect(screen.getByPlaceholderText(/HH:MM/i)).toHaveValue('01:20');
  });

  test('submits the form and calls editTask', () => {
    render(<EditTaskModal task={task} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter task title/i), {
      target: { value: 'Updated Task', name: 'title' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter task description/i), {
      target: { value: 'Updated Description', name: 'description' },
    });
    fireEvent.change(screen.getByPlaceholderText(/HH:MM/i), { target: { value: '120', name: 'estimatedTime' } });

    fireEvent.click(screen.getByText('Edit'));

    expect(editTask).toHaveBeenCalledWith({
      ...task,
      title: 'Updated Task',
      description: 'Updated Description',
      estimatedTime: 80,
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('deletes the task and calls deleteTask', () => {
    render(<EditTaskModal task={task} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText(/Delete/i));

    expect(deleteTask).toHaveBeenCalledWith(1);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('cancels the form and resets state', () => {
    render(<EditTaskModal task={task} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter task title/i), {
      target: { value: 'Updated Task', name: 'title' },
    });

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(screen.getByPlaceholderText(/Enter task title/i)).toHaveValue('Sample Task');
    expect(mockOnClose).toHaveBeenCalled();
  });
});
