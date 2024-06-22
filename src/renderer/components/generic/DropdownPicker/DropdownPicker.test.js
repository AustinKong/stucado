import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropdownPicker from './index.jsx';

describe('DropdownPicker Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  const mockOnSelect = jest.fn();

  test('renders the dropdown with label', () => {
    render(<DropdownPicker options={options} onSelect={mockOnSelect} label="Sample label" />);
    const labelElement = screen.getByText('Sample label');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders the dropdown with the correct initial value', () => {
    render(<DropdownPicker options={options} onSelect={mockOnSelect} value="option2" />);
    const headerElement = screen.getByText('Option 2');
    expect(headerElement).toBeInTheDocument();
  });

  test('toggles the dropdown options on header click', () => {
    render(<DropdownPicker options={options} onSelect={mockOnSelect} />);
    const headerElement = screen.getByText('Select an option');
    fireEvent.click(headerElement);
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
    fireEvent.click(headerElement);
    options.forEach((option) => {
      expect(screen.queryByText(option.label)).not.toBeInTheDocument();
    });
  });

  test('selects an option and calls onSelect', () => {
    render(<DropdownPicker options={options} onSelect={mockOnSelect} />);
    const headerElement = screen.getByText('Select an option');
    fireEvent.click(headerElement);
    const optionElement = screen.getByText('Option 1');
    fireEvent.click(optionElement);
    expect(mockOnSelect).toHaveBeenCalledWith({ value: 'option1', label: 'Option 1' });
    expect(headerElement).toHaveTextContent('Option 1');
  });

  test('closes the dropdown when clicking outside', () => {
    render(<DropdownPicker options={options} onSelect={mockOnSelect} />);
    const headerElement = screen.getByText('Select an option');
    fireEvent.click(headerElement);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    fireEvent.mouseDown(document);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });
});
