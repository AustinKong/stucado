import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadModal from './index.jsx';
import { uploadTimetable } from '@services/timetable';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('@services/timetable', () => ({
  uploadTimetable: jest.fn(),
}));

const mockStore = configureStore([]);

describe('UploadModal Component', () => {
  const mockOnClose = jest.fn();
  let store;

  beforeEach(() => {
    mockOnClose.mockClear();
    uploadTimetable.mockClear();
    document.body.innerHTML = '<div id="portal"></div>';
    store = mockStore({
      settings: {
        colorTheme: 'blue',
      },
    });
  });

  test('renders modal with correct elements', () => {
    render(
      <Provider store={store}>
        <UploadModal onClose={mockOnClose} />
      </Provider>
    );

    expect(screen.getByText(/Upload timetable/i)).toBeInTheDocument();
    expect(screen.getByText(/Import your NUS Mods timetable via URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Timetable URL/i)).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(
      <Provider store={store}>
        <UploadModal onClose={mockOnClose} />
      </Provider>
    );

    const input = screen.getByLabelText(/Timetable URL/i);
    fireEvent.change(input, { target: { value: 'http://example.com/timetable', name: 'url' } });

    expect(input).toHaveValue('http://example.com/timetable');
  });

  test('submits the form successfully', async () => {
    uploadTimetable.mockResolvedValue(true);

    render(
      <Provider store={store}>
        <UploadModal onClose={mockOnClose} />
      </Provider>
    );

    const input = screen.getByLabelText(/Timetable URL/i);
    fireEvent.change(input, { target: { value: 'http://example.com/timetable', name: 'url' } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(uploadTimetable).toHaveBeenCalledWith('http://example.com/timetable');
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  test('handles form submission failure', async () => {
    uploadTimetable.mockResolvedValue(false);

    render(
      <Provider store={store}>
        <UploadModal onClose={mockOnClose} />
      </Provider>
    );

    const input = screen.getByLabelText(/Timetable URL/i);
    fireEvent.change(input, { target: { value: 'http://example.com/timetable', name: 'url' } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(uploadTimetable).toHaveBeenCalledWith('http://example.com/timetable');
      expect(mockOnClose).not.toHaveBeenCalled();
      expect(screen.getByText(/Error uploading, please retry/i)).toBeInTheDocument();
    });
  });

  test('cancels the form', () => {
    render(
      <Provider store={store}>
        <UploadModal onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
