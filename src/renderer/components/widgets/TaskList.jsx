import { PlusCircle, DotsThreeCircle } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import '@styles/widgets/taskList.css';
import { Widget, InteractionButton } from '@components/widgets/Widget';
import { incrementTaskStatus, decrementTaskStatus, createTask } from '@services/tasks';
import {
  Modal,
  ModalTextInput,
  ModalNumberInput,
  ModalBeside,
  ModalFooter,
  ModalButtonPrimary,
  ModalButtonSecondary,
} from '@components/generic/Modal';
import { deleteTask, editTask } from '@services/tasks';

/*
  Tasks are in format of: {
    id: number,
    title: string,
    description: string,
    status: 'pending' | 'inProgress' | 'completed',
    estimatedTime: number (in minutes),
    beginTime: Date,
    endTime: Date,
}
*/

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false);

  return (
    <Widget
      className="task-list"
      title={'Tasks (3)'}
      interaction={
        <InteractionButton icon={<PlusCircle />} text="Add a new task" onClick={() => setAddTaskModalIsOpen(true)} />
      }
    >
      <ul className="task-list__list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>

      <AddTaskModal isOpen={addTaskModalIsOpen} onClose={() => setAddTaskModalIsOpen(false)} />
    </Widget>
  );
};

const TaskItem = ({ task }) => {
  const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false);

  const taskStatusToCSS = (status) =>
    status === 'Pending' ? 'pending' : status === 'InProgress' ? 'in-progress' : 'completed';

  const handleToggleTaskStatus = (event) => {
    if (event.type === 'click') {
      void incrementTaskStatus(task.id);
    } else if (event.type === 'contextmenu') {
      void decrementTaskStatus(task.id);
    }
  };

  return (
    <li className="task-item">
      <div
        className={`task-item__status task-item__status--${taskStatusToCSS(task.status)}`}
        onClick={handleToggleTaskStatus}
        onContextMenu={handleToggleTaskStatus}
      />
      <div className="task-item__content">
        <p className="task-item__title">{task.title}</p>
        <p className="task-item__description">{task.description}</p>
      </div>
      <DotsThreeCircle
        className="task-item__edit"
        size="24"
        color="var(--text-secondary)"
        onClick={() => setEditTaskModalIsOpen(true)}
      />

      <EditTaskModal task={task} isOpen={editTaskModalIsOpen} onClose={() => setEditTaskModalIsOpen(false)} />
    </li>
  );
};

const AddTaskModal = ({ isOpen, onClose }) => {
  const defaultState = {
    title: '',
    estimatedTimeHours: 0,
    estimatedTimeMinutes: 15,
    description: '',
  };

  const [formContent, setFormContent] = useState(defaultState);

  const handleChange = (event) => {
    setFormContent({ ...formContent, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void createTask(
      formContent.title,
      formContent.description,
      formContent.estimatedTimeHours * 60 + formContent.estimatedTimeMinutes
    );
    setFormContent(defaultState);
    onClose();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormContent(defaultState);
    onClose();
  };

  return (
    <Modal title="Add task" subtitle="Add a new task" isOpen={isOpen} onClose={onClose}>
      <ModalTextInput title="Title" nameKey="title" value={formContent.title} onChange={handleChange} required={true} />
      <ModalTextInput
        title="Description"
        nameKey="description"
        value={formContent.description}
        onChange={handleChange}
      />
      <ModalBeside>
        <ModalNumberInput
          title="Estimated time (hours)"
          nameKey="estimatedTimeHours"
          value={formContent.estimatedTimeHours}
          onChange={handleChange}
        />
        <ModalNumberInput
          title="Estimated time (minutes)"
          nameKey="estimatedTimeMinutes"
          value={formContent.estimatedTimeMinutes}
          onChange={handleChange}
          required={true}
        />
      </ModalBeside>
      <ModalFooter
        left={<ModalButtonSecondary text="Cancel" onClick={handleCancel} />}
        right={<ModalButtonPrimary text="Submit" onClick={handleSubmit} />}
      />
    </Modal>
  );
};

const EditTaskModal = ({ task, isOpen, onClose }) => {
  const defaultState = {
    title: task.title,
    description: task.description,
    estimatedTimeHours: Math.floor(task.estimatedTime / 60),
    estimatedTimeMinutes: task.estimatedTime % 60,
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
      estimatedTime: formContent.estimatedTimeHours * 60 + formContent.estimatedTimeMinutes,
    });
    onClose();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    void deleteTask(task.id);
    onClose();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormContent(defaultState);
    onClose();
  };

  return (
    <Modal title="Edit task" subtitle="Modify task information" isOpen={isOpen} onClose={onClose}>
      <ModalTextInput title="Title" nameKey="title" value={formContent.title} onChange={handleChange} required={true} />
      <ModalTextInput
        title="Description"
        nameKey="description"
        value={formContent.description}
        onChange={handleChange}
      />
      <ModalBeside>
        <ModalNumberInput
          title="Estimated time (hours)"
          nameKey="estimatedTimeHours"
          value={formContent.estimatedTimeHours}
          onChange={handleChange}
        />
        <ModalNumberInput
          title="Estimated time (minutes)"
          nameKey="estimatedTimeMinutes"
          value={formContent.estimatedTimeMinutes}
          onChange={handleChange}
          required={true}
        />
      </ModalBeside>
      <ModalFooter
        left={<ModalButtonSecondary text="Delete task" onClick={handleDelete} />}
        right={
          <>
            <ModalButtonSecondary text="Cancel" onClick={handleCancel} />
            <ModalButtonPrimary text="Submit" onClick={handleSubmit} />
          </>
        }
      />
    </Modal>
  );
};

export default TaskList;
