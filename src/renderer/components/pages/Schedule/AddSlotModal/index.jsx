import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from '@components/generic/Modal';
import { DaysOfWeek } from '@shared/constants';
import Input from '@components/generic/Input';
import TextArea from '@components/generic/TextArea';
import DurationPicker from '@components/generic/DurationPicker';
import Button from '@components/generic/Button';
import DropdownPicker from '@components/generic/DropdownPicker';
import { useState } from 'react';

const AddSlotModal = ({ onClose }) => {
  const defaultState = {
    title: '',
    description: '',
    day: DaysOfWeek[new Date().getDay()],
    startTime: 0,
    endTime: 0,
  };

  const [formContent, setFormContent] = useState(defaultState);

  const handleChange = (event) => {
    setFormContent({ ...formContent, [event.target.name]: event.target.value });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormContent(defaultState);
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formContent);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Add timetable slot</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Input label="Title" name="title" placeholder="Add a title" onChange={handleChange} required={true} />
        <TextArea label="Description" placeholder="Add a description" name="description" onChange={handleChange} />
        <DurationPicker
          label="Start time"
          name="startTime"
          onChange={handleChange}
          value={new Date().getMinutes() + new Date().getHours() * 60}
        />
        <DurationPicker
          label="End time"
          name="endTime"
          onChange={handleChange}
          value={new Date().getMinutes() + new Date().getHours() * 60 + 60}
        />
        <DropdownPicker
          label="Day"
          options={DaysOfWeek.map((day) => ({ label: day, value: day }))}
          onSelect={(day) => setFormContent({ ...formContent, day: day.value })}
          value={formContent.day}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleCancel} appearance="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </ModalFooter>
    </Modal>
  );

  /*
  return (
    <Modal
      title="Add timetable slot"
      subtitle="Create a new recurring timetable slot"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalTextInput title="Title" nameKey="title" value={formContent.title} onChange={handleChange} required={true} />
      <ModalTextInput
        title="Description"
        nameKey="description"
        value={formContent.description}
        onChange={handleChange}
      />
      <ModalBeside>
        <ModalNumberInput
          title="Start time (hours)"
          nameKey="startTimeHours"
          value={formContent.startTimeHours}
          onChange={handleChange}
        />
        <ModalNumberInput
          title="Start time (minutes)"
          nameKey="startTimeMinutes"
          value={formContent.startTimeMinutes}
          onChange={handleChange}
        />
      </ModalBeside>
      <ModalBeside>
        <ModalNumberInput
          title="End time (hours)"
          nameKey="endTimeHours"
          value={formContent.endTimeHours}
          onChange={handleChange}
        />
        <ModalNumberInput
          title="End time (minutes)"
          nameKey="endTimeMinutes"
          value={formContent.endTimeMinutes}
          onChange={handleChange}
        />
      </ModalBeside>
      <ModalFooter
        left={<ModalButtonSecondary text="Cancel" onClick={handleCancel} />}
        right={<ModalButtonPrimary text="Submit" onClick={handleSubmit} />}
      />
    </Modal>
  );
  */
};

export default AddSlotModal;
