import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './index.jsx';

describe('Input Component', () => {
  test('renders correctly with required props', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" value="test" onChange={() => {}} />);

    const inputField = getByPlaceholderText('Enter text');
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('test');
  });

  test('renders label when provided', () => {
    const { getByText } = render(<Input label="Label" placeholder="Enter text" value="test" onChange={() => {}} />);

    const label = getByText('Label');
    expect(label).toBeInTheDocument();
  });

  test('renders required star when required is true', () => {
    const { getByText } = render(
      <Input label="Label" required={true} placeholder="Enter text" value="test" onChange={() => {}} />
    );

    const requiredStar = getByText('*');
    expect(requiredStar).toBeInTheDocument();
  });

  test('renders icon when provided', () => {
    const { getByText } = render(
      <Input icon={<span>Icon</span>} placeholder="Enter text" value="test" onChange={() => {}} />
    );

    const icon = getByText('Icon');
    expect(icon).toBeInTheDocument();
  });

  test('handles onChange event', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" value="" onChange={handleChange} />);

    const inputField = getByPlaceholderText('Enter text');
    fireEvent.change(inputField, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('handles onBlur event', () => {
    const handleBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" value="" onChange={() => {}} onBlur={handleBlur} />
    );

    const inputField = getByPlaceholderText('Enter text');
    fireEvent.blur(inputField);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
