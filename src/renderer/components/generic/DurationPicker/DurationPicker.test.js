/* eslint-disable react/display-name */
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DurationPicker from './index.jsx';

jest.mock('@components/generic/Input', () => {
  return ({ label, name, type, placeholder, value, onChange, onBlur }) => (
    <input
      aria-label={label}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
});

describe('DurationPicker', () => {
  const onChangeMock = jest.fn();

  beforeEach(() => {
    onChangeMock.mockClear();
  });

  test('renders correctly with default props', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <DurationPicker label="Duration" name="duration" onChange={onChangeMock} />
    );

    expect(getByLabelText('Duration')).toBeInTheDocument();
    expect(getByPlaceholderText('HH:MM')).toHaveValue('00:00');
  });

  test('handles valid input change correctly', () => {
    const { getByLabelText } = render(<DurationPicker label="Duration" name="duration" onChange={onChangeMock} />);

    const input = getByLabelText('Duration');
    fireEvent.change(input, { target: { value: '0123' } });
    fireEvent.blur(input);

    expect(input).toHaveValue('01:23');
    expect(onChangeMock).toHaveBeenCalledWith({ target: { name: 'duration', value: 83 } });
  });

  test('handles input above max value to clamp', () => {
    const { getByLabelText } = render(<DurationPicker label="Duration" name="duration" onChange={onChangeMock} />);

    const input = getByLabelText('Duration');
    fireEvent.change(input, { target: { value: '2500' } });
    fireEvent.blur(input);

    expect(input).toHaveValue('23:59');
  });

  test('invalid input is not registered', () => {
    const { getByLabelText } = render(<DurationPicker label="Duration" name="duration" onChange={onChangeMock} />);

    const input = getByLabelText('Duration');
    fireEvent.change(input, { target: { value: '-$1a0' } });
    fireEvent.blur(input);

    expect(input).toHaveValue('00:10');
  });

  test('handles slider change correctly', () => {
    const { getByRole } = render(<DurationPicker label="Duration" name="duration" onChange={onChangeMock} />);

    const slider = getByRole('slider');
    fireEvent.change(slider, { target: { value: 120 } });

    expect(slider).toHaveValue('120');
    expect(onChangeMock).toHaveBeenCalledWith({ target: { name: 'duration', value: '120' } });
  });
});
