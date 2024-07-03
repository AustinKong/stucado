import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextArea from './index.jsx';

describe('TextArea Component', () => {
  test('renders correctly with required props', () => {
    const { getByPlaceholderText } = render(<TextArea placeholder="Enter text" value="test" onChange={() => {}} />);

    const textArea = getByPlaceholderText('Enter text');
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue('test');
  });

  test('renders label when provided', () => {
    const { getByText } = render(<TextArea label="Label" placeholder="Enter text" value="test" onChange={() => {}} />);

    const label = getByText('Label');
    expect(label).toBeInTheDocument();
  });

  test('renders required star when required is true', () => {
    const { getByText } = render(
      <TextArea label="Label" required={true} placeholder="Enter text" value="test" onChange={() => {}} />
    );

    const requiredStar = getByText('*');
    expect(requiredStar).toBeInTheDocument();
  });

  test('handles onChange event', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(<TextArea placeholder="Enter text" value="" onChange={handleChange} />);

    const textArea = getByPlaceholderText('Enter text');
    fireEvent.change(textArea, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('handles onBlur event', () => {
    const handleBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <TextArea placeholder="Enter text" value="" onChange={() => {}} onBlur={handleBlur} />
    );

    const textArea = getByPlaceholderText('Enter text');
    fireEvent.blur(textArea);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
