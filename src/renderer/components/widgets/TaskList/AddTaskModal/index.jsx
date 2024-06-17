import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from '@components/generic/Modal';
import Button from '@components/generic/Button';
import Input from '@components/generic/Input';
import DurationPicker from '@components/generic/DurationPicker';
import TextArea from '@components/generic/TextArea';

import { useState } from 'react';
import { createTask } from '@services/tasks.js';

const AddTaskModal = ({ onClose }) => {
  const defaultState = {
    title: '',
    estimatedTime: 0,
    description: '',
  };

  const [formContent, setFormContent] = useState(defaultState);

  const handleChange = (event) => {
    setFormContent({ ...formContent, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void createTask(formContent.title, formContent.description, formContent.estimatedTime);
    setFormContent(defaultState);
    onClose();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormContent(defaultState);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Add task</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Input
          label="Title"
          name="title"
          placeholder="Enter task title"
          value={formContent.title}
          onChange={handleChange}
          required={true}
        />
        <TextArea
          label="Description"
          name="description"
          placeholder="Enter task description"
          value={formContent.description}
          onChange={handleChange}
        />
        <DurationPicker label="Estimated time" name="estimatedTime" onChange={handleChange} />
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleCancel} appearance="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddTaskModal;
