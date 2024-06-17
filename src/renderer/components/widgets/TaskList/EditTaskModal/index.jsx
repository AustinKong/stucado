import Modal, { ModalHeader, ModalBody, ModalFooter, ModalTitle } from '@components/generic/Modal';
import Button from '@components/generic/Button';
import Input from '@components/generic/Input';
import TextArea from '@components/generic/TextArea';
import DurationPicker from '@components/generic/DurationPicker';
import styles from './styles.module.css';
import { useState } from 'react';
import { editTask, deleteTask } from '@services/tasks.js';

const EditTaskModal = ({ task, onClose }) => {
  const defaultState = {
    title: task.title,
    description: task.description,
    estimatedTime: task.estimatedTime,
  };

  const [formContent, setFormContent] = useState(defaultState);

  const handleChange = (event) => {
    setFormContent({ ...formContent, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void editTask({
      ...task,
      title: formContent.title,
      description: formContent.description,
      estimatedTime: formContent.estimatedTime,
    });
    onClose();
  };

  const handleDelete = () => {
    void deleteTask(task.id);
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
        <ModalTitle>Edit task</ModalTitle>
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
        <DurationPicker
          label="Estimated time"
          name="estimatedTime"
          onChange={handleChange}
          initialValue={formContent.estimatedTime}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleDelete} appearance="danger" className={styles.delete}>
          Delete
        </Button>
        <Button onClick={handleCancel} appearance="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Edit</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTaskModal;
