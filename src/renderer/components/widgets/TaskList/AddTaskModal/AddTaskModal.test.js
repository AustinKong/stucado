import { render, screen, fireEvent } from '@testing-library/react';
import AddTaskModal from './index.jsx';
import { createTask } from '@services/tasks';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('@services/tasks', () => ({
  createTask: jest.fn(),
}));

const mockStore = configureStore([]);

describe('AddTaskModal Component', () => {
  const mockOnClose = jest.fn();
  let store;

  beforeEach(() => {
    document.body.innerHTML = '<div id="portal"></div>';
    mockOnClose.mockClear();
    createTask.mockClear();
    store = mockStore({
      settings: {
        colorTheme: 'blue',
      },
    });
  });

  test('renders modal with default state', () => {
    render(
      <Provider store={store}>
        <AddTaskModal onClose={mockOnClose} />
      </Provider>
    );

    expect(screen.getByText(/Add task/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter task title/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/Enter task description/i)).toHaveValue('');
  });

  test('handles input changes', () => {
    render(
      <Provider store={store}>
        <AddTaskModal onClose={mockOnClose} />
      </Provider>
    );

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
    render(
      <Provider store={store}>
        <AddTaskModal onClose={mockOnClose} />
      </Provider>
    );

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
    render(
      <Provider store={store}>
        <AddTaskModal onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter task title/i), {
      target: { value: 'Test Task', name: 'title' },
    });

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(screen.getByPlaceholderText(/Enter task title/i)).toHaveValue('');
    expect(mockOnClose).toHaveBeenCalled();
  });
});
