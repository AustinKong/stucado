import { useState } from 'react';
import styles from './styles.module.css';
import Input from '@components/generic/Input';

// To whom it may concern, this component i spend half a day working on, the regex witchcraft shocks me, god save gpt
/**
 * A component that allows the user to pick a time duration within a specified range.
 *
 * @component
 * @param {string} props.label - The label for the duration picker.
 * @param {number} [props.min=0] - The minimum duration value in minutes.
 * @param {number} [props.max=1440] - The maximum duration value in minutes.
 * @param {string} props.name - The name of the duration picker.
 * @param {number} [props.initialValue=min] - The initial duration value in minutes.
 * @param {function} props.onChange - The callback function to be called when the duration value changes.
 * @returns {JSX.Element} The rendered DurationPicker component.
 */
const DurationPicker = ({ label, min = 0, max = 1440, name, value = min, onChange }) => {
  const convertToDuration = (minutes) => {
    const hours = String(Math.floor(minutes / 60));
    const remainingMinutes = String(minutes % 60);
    return `${hours.padStart(2, '0')}:${remainingMinutes.padStart(2, '0')}`;
  };

  const convertToMinutes = (duration) => {
    const [hours, minutes] = duration.split(':');
    return hours * 60 + +minutes;
  };

  const validateDuration = (duration) => {
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(duration) && convertToMinutes(duration) >= min && convertToMinutes(duration) <= max;
  };

  const formatDuration = (value) => {
    const [hours, minutes] = value.split(':').map((part) => part.padStart(2, '0'));
    return `${hours}:${minutes}`;
  };

  const [duration, setDuration] = useState(formatDuration(convertToDuration(value)));
  const [sliderValue, setSliderValue] = useState(value);

  const handleInputChange = (event) => {
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    // Only used here, different from format duration
    const formatInput = (value) => {
      let output = '';
      if (value.length < 5) {
        const padded = value.padStart(4, '0');
        output = padded.slice(0, 2) + ':' + padded.slice(2);
      } else {
        if (value[0] === '0') {
          const trimmed = value.slice(1);
          output = trimmed.slice(0, 2) + ':' + trimmed.slice(2);
        } else {
          output = value.slice(0, 2) + ':' + value.slice(2, 4);
        }
      }
      return (
        String(clamp(Number(output.slice(0, 2)), 0, 23)).padStart(2, '0') +
        ':' +
        String(clamp(Number(output.slice(3)), 0, 59)).padStart(2, '0')
      );
    };

    const value = event.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    let formattedDuration = formatInput(value);
    setDuration(formattedDuration);

    if (validateDuration(formattedDuration)) {
      const minutes = convertToMinutes(formattedDuration);
      setSliderValue(minutes);
      onChange({ target: { name: name, value: minutes } });
    }
  };

  const handleInputBlur = () => {
    if (validateDuration(duration)) {
      const formattedDuration = formatDuration(duration);
      setDuration(formattedDuration);
      const minutes = convertToMinutes(formattedDuration);
      setSliderValue(minutes);
      onChange({ target: { name: name, value: minutes } });
    } else {
      setDuration('00:00'); // Reset to default if invalid
      setSliderValue(0);
    }
  };

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
    const formattedDuration = formatDuration(convertToDuration(value));
    setDuration(formattedDuration);
    onChange({ target: { name: name, value: value } });
  };

  return (
    <div className={styles.durationPicker}>
      <Input
        label={label}
        name="duration"
        type="text"
        placeholder="HH:MM"
        value={duration}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={sliderValue}
        onChange={handleSliderChange}
        className={styles.durationPicker__slider}
      />
    </div>
  );
};

export default DurationPicker;
