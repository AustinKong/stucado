import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from '@components/generic/Modal';
import Button from '@components/generic/Button';
import DurationPicker from '@components/generic/DurationPicker';
import { updatePomodoroDurations } from '@services/pomodoro';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const EditPomodoroModal = ({ onClose }) => {
  const pomodoroSettings = useSelector((state) => state.pomodoro.settings);
  const pomodoroSettingsConverted = {
    workDurationMinutes: Math.floor(pomodoroSettings.workDuration / 60),
    shortBreakDurationMinutes: Math.floor(pomodoroSettings.shortBreakDuration / 60),
    longBreakDurationMinutes: Math.floor(pomodoroSettings.longBreakDuration / 60),
  };

  const [formContent, setFormContent] = useState(pomodoroSettingsConverted);

  const handleChange = (event) => {
    setFormContent({ ...formContent, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void updatePomodoroDurations(
      formContent.workDurationMinutes * 60,
      formContent.shortBreakDurationMinutes * 60,
      formContent.longBreakDurationMinutes * 60
    );
    onClose();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormContent(pomodoroSettingsConverted);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Edit Pomodoro Settings</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <DurationPicker
          label="Work duration"
          name="workDurationMinutes"
          initialValue={pomodoroSettingsConverted.workDurationMinutes}
          onChange={handleChange}
          max={120}
        />
        <DurationPicker
          label="Short break duration"
          name="shortBreakDurationMinutes"
          initialValue={pomodoroSettingsConverted.shortBreakDurationMinutes}
          onChange={handleChange}
          max={60}
        />
        <DurationPicker
          label="Long break duration"
          name="longBreakDurationMinutes"
          initialValue={pomodoroSettingsConverted.longBreakDurationMinutes}
          onChange={handleChange}
          max={90}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleCancel} appearance="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditPomodoroModal;
