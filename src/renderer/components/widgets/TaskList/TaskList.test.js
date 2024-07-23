import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskList from './index.jsx';

const mockStore = configureStore([]);

describe('TaskList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      tasks: [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description 1',
          status: 'pending',
          estimatedTime: 60,
          beginTime: new Date(),
          endTime: new Date(),
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description 2',
          status: 'inProgress',
          estimatedTime: 120,
          beginTime: new Date(),
          endTime: new Date(),
        },
      ],
      settings: {
        colorTheme: 'blue',
      },
    });

    document.body.innerHTML = '<div id="portal"></div>';
  });

  test('renders TaskList with tasks from store', () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(screen.getByText(/Tasks \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
  });

  test('opens AddTaskModal on button click', () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    fireEvent.click(screen.getByText(/New Task/i));
    expect(screen.getByText(/Add task/i)).toBeInTheDocument();
  });

  test('displays empty message when no tasks', () => {
    store = mockStore({
      tasks: [],
    });

    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(screen.getByText(/Create a new task to get started!/i)).toBeInTheDocument();
  });
});
