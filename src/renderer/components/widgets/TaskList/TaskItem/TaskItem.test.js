/* eslint-disable react/display-name */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskItem from './index.jsx';
import { incrementTaskStatus, decrementTaskStatus } from '@services/tasks';

jest.mock('@services/tasks', () => ({
  incrementTaskStatus: jest.fn(),
  decrementTaskStatus: jest.fn(),
}));

jest.mock('@components/widgets/TaskList/EditTaskModal', () => (props) => {
  return props.isOpen ? <div>Edit Task Modal</div> : null;
});

describe('TaskItem Component', () => {
  const task = {
    id: 1,
    title: 'Sample Task',
    description: 'Sample Description',
    status: 'Pending',
  };

  beforeEach(() => {
    incrementTaskStatus.mockClear();
    decrementTaskStatus.mockClear();
    document.body.innerHTML = '<div id="portal"></div>';
  });

  test('renders task item with correct data', () => {
    render(<TaskItem task={task} />);

    expect(screen.getByText(/Sample Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Description/i)).toBeInTheDocument();
  });

  test('handles status increment on click', () => {
    render(<TaskItem task={task} />);

    fireEvent.click(screen.getByText(/Sample Task/i));
    expect(incrementTaskStatus).toHaveBeenCalledWith(1);
  });

  test('handles status decrement on context menu', () => {
    render(<TaskItem task={task} />);

    fireEvent.contextMenu(screen.getByText(/Sample Task/i));
    expect(decrementTaskStatus).toHaveBeenCalledWith(1);
  });

  test('opens edit task modal', () => {
    render(<TaskItem task={task} />);

    fireEvent.click(screen.getByTestId('edit-icon'));
    expect(screen.getByText(/Edit Task Modal/i)).toBeInTheDocument();
  });
});
