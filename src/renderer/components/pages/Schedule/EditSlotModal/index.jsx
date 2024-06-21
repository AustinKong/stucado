import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from '@components/generic/Modal';
import { DaysOfWeek } from '@shared/constants';
import Input from '@components/generic/Input';
import TextArea from '@components/generic/TextArea';
import DurationPicker from '@components/generic/DurationPicker';
import Button from '@components/generic/Button';
import DropdownPicker from '@components/generic/DropdownPicker';
import { useState } from 'react';
import styles from './styles.module.css';
import { updateTimetableSlot } from '@services/timetable';

const EditSlotModal = ({ slot, onClose }) => {
  const defaultState = {
    title: slot.title,
    description: slot.description,
    startTime: slot.schedule.startTime,
    endTime: slot.schedule.endTime,
    day: slot.schedule.day,
  };

  const [formContent, setFormContent] = useState(defaultState);

  const handleChange = (event) => {
    setFormContent({ ...formContent, [event.target.name]: event.target.value });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormContent(defaultState);
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void updateTimetableSlot({ 
      title: formContent.title,
      description: formContent.description,
      id: slot.id,
      schedule: {
        startTime: formContent.startTime,
        endTime: formContent.endTime,
        day: formContent.day,
      },
     });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Edit timetable slot</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Input label="Title" name="title" value={formContent.title} onChange={handleChange} required={true} />
        <TextArea label="Description" name="description" value={formContent.description} onChange={handleChange} />
        <DurationPicker
          label="Start time"
          name="startTime"
          onChange={handleChange}
          initialValue={formContent.startTime}
        />
        <DurationPicker label="End time" name="endTime" onChange={handleChange} initialValue={formContent.endTime} />
        <DropdownPicker
          label="Day"
          options={DaysOfWeek.map((day) => ({ label: day, value: day }))}
          onSelect={(day) => setFormContent({ ...formContent, day: day.value })}
          value={formContent.day}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleDelete} appearance="danger" className={styles.delete}>
          Delete
        </Button>
        <Button onClick={handleCancel} appearance="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditSlotModal;
