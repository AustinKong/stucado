import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Timetable from './index.jsx';

const mockStore = configureStore([]);
const PX_PER_MINUTE = (48 * 4) / 60;

describe('Timetable Widget', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      timetable: [
        {
          schedule: { day: 'Monday', startTime: 480, endTime: 540 },
          title: 'Sample Event 1',
          type: 'timetable',
        },
        {
          schedule: { day: 'Tuesday', startTime: 600, endTime: 660 },
          title: 'Sample Event 2',
          type: 'bookmark',
        },
      ],
    });

    document.body.innerHTML = '<div id="portal"></div>';
  });

  test('renders Timetable with tasks from store', () => {
    render(
      <Provider store={store}>
        <Timetable />
      </Provider>
    );

    expect(screen.getByText(/Schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/Mon/i)).toBeInTheDocument();
    expect(screen.getByText(/Tue/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Event 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Event 2/i)).toBeInTheDocument();
  });

  test('opens UploadModal on button click', () => {
    render(
      <Provider store={store}>
        <Timetable />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Upload/i));
    expect(screen.getByText(/Upload timetable/i)).toBeInTheDocument();
  });

  test('displays current time indicator correctly', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Timetable />
      </Provider>
    );

    const currentTimeRef = getByTestId('currentTime');
    await waitFor(() => {
      const minutesSinceMidnight = new Date().getHours() * 60 + new Date().getMinutes();
      expect(currentTimeRef).toHaveStyle(`left: ${minutesSinceMidnight * PX_PER_MINUTE}px`);
    });
  });
});
