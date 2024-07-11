import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadModal from './index.jsx';
import { uploadTimetable } from '@services/timetable';

jest.mock('@services/timetable', () => ({
  uploadTimetable: jest.fn(),
}));

describe('UploadModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    uploadTimetable.mockClear();
    document.body.innerHTML = '<div id="portal"></div>';
  });

  test('renders modal with correct elements', () => {
    render(<UploadModal onClose={mockOnClose} />);

    expect(screen.getByText(/Upload timetable/i)).toBeInTheDocument();
    expect(screen.getByText(/Import your NUS Mods timetable via URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Timetable URL/i)).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(<UploadModal onClose={mockOnClose} />);

    const input = screen.getByLabelText(/Timetable URL/i);
    fireEvent.change(input, { target: { value: 'http://example.com/timetable', name: 'url' } });

    expect(input).toHaveValue('http://example.com/timetable');
  });

  test('submits the form successfully', async () => {
    uploadTimetable.mockResolvedValue(true);

    render(<UploadModal onClose={mockOnClose} />);

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

    render(<UploadModal onClose={mockOnClose} />);

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
    render(<UploadModal onClose={mockOnClose} />);

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
